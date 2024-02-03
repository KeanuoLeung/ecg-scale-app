package com.cheroee.combinedemo;

import android.Manifest;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.IntentCompat;

import com.cheroee.cherosdk.ChBatteryData;
import com.cheroee.cherosdk.ChMsg;
import com.cheroee.cherosdk.ChSdkManager;
import com.cheroee.cherosdk.bluetooth.ChScanResult;
import com.cheroee.cherosdk.ecg.model.ChDetectionResult;
import com.cheroee.cherosdk.ecg.model.ChEcgSmoothedData;
import com.cheroee.cherosdk.ecg.model.ChHeartRate;
import com.ecgparser.healthcloud.ecgparser.EcgHrvReport;
import com.ecgparser.healthcloud.ecgparser.EcgLib;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@CapacitorPlugin(name = "Ecg")
public class EcgPlugin extends Plugin {

    private boolean inited = false;
    String filePath = null;
    long lastTime = 0;
    private Handler mHandler;
    private ArrayList<ChScanResult> deviceList;

    public static String arrayToStringWithNewLine(float[] array) {
        if (array == null || array.length == 0) {
            return "[]";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[\n");
        for (float value : array) {
            sb.append("    ").append(value).append("\n");
        }
        sb.append("]");

        return sb.toString();
    }

    @Override
    public void load() {
        super.load();
        initPlugin();
    }

    public void initPlugin() {
        this.inited = true;
        showToast("插件初始化成功");
        JSObject raw = new JSObject();
        raw.put("success", true);
        notifyListeners("plugin-init", raw);
        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                onReceviceEvent(msg);
            }
        };
        ChSdkManager.getInstance().init(mHandler, getActivity().getApplicationContext());
        checkLicense();
    }

    private void onReceviceEvent(Message msg) {
        Log.e("EVENT", String.format("%d", msg.what));
        JSObject raw = new JSObject();
        raw.put("what", msg.what);
        raw.put("arg1", msg.arg1);
        raw.put("arg2", msg.arg2);
        // notifyListeners("ecgRawMessage", raw);
        switch (msg.what) {
            case ChMsg.MSG_SCAN_START:
                // showToast("扫描开始");
                break;
            case ChMsg.MSG_SCAN_RESULT:
                onScanResult((ChScanResult) msg.obj);
                break;
            case ChMsg.MSG_SCAN_FAIL:
                Log.e("扫描失败", String.format("%d", msg.arg1));
                break;
            case ChMsg.MSG_ECG_SMOOTH_ECG:
                onRaw(msg);
                break;
            case ChMsg.MSG_ECG_RESULT:
                onEcgResult(msg);
                break;
            case ChMsg.MSG_ECG_HR:
                onHeartRate(msg);
                break;
            case ChMsg.MSG_CONNECTED:
                onConnected();
                break;
            case ChMsg.MSG_BATTERY:
                onBattery(msg);
                break;
            case ChMsg.MSG_DISCONNECTED:
                onDisconnected(msg);
                break;
        }
    }

    private void onDisconnected(Message msg) {
        JSObject success = new JSObject();
        success.put("success", true);
        notifyListeners("dis", success);
    }

    private void onBattery(Message msg) {
        ChBatteryData batt = (ChBatteryData) msg.obj;
        String pid = batt.device.pid;
        int battLevel = batt.battery;
        JSObject bat = new JSObject();
        bat.put("pid", pid);
        bat.put("battery", battLevel);
        notifyListeners("battery", bat);
    }

    private void onConnected() {
        JSObject event = new JSObject();
        event.put("success", true);
        notifyListeners("connected", event);
    }

    private void onRaw(Message msg) {
        ChEcgSmoothedData data = (ChEcgSmoothedData) msg.obj;

        long time = System.currentTimeMillis();
        /* WARN: 将所有接收到的滤波数据处理(存储、绘图)
         * 此处仅显示50ms的最新数据
         */
        if (time - lastTime > 50) {
            JSObject smoothData = new JSObject();
            smoothData.put("time", data.time);
            smoothData.put("isLost", data.isLost);
            JSArray dataArr = new JSArray();
            for (int v : data.values) {
                dataArr.put(v);
            }
            smoothData.put("data", dataArr);
            notifyListeners("ecgRawData", smoothData);
        }

    }


    private void onEcgResult(Message msg) {
        ChDetectionResult result = (ChDetectionResult) msg.obj;
        JSObject ecg = new JSObject();
        ecg.put("time", result.time);
        ecg.put("qrsIndex", result.qrsIndex);
        ecg.put("qrsDelay", result.qrsDelay);
        ecg.put("beatType", result.beatType);
        ecg.put("rrInterval", result.rrInterval);
        ecg.put("heartRate", result.heartRate);
        ecg.put("morphType", result.morphType);
        ecg.put("morphId", result.morphId);

        notifyListeners("ecgResult", ecg);
    }

    private void onScanResult(ChScanResult result) {

        ChScanResult target = null;
        for (ChScanResult obj : deviceList) {
            if (result.pid.equals(obj.pid)) {
                target = obj;
                break;
            }
        }
        if (target == null) {
            deviceList.add(result);
        }
        JSArray notifyList = new JSArray();
        for (ChScanResult obj : deviceList) {
            JSObject device = new JSObject();
            device.put("pid", obj.pid);
            device.put("mac", obj.mac);
            device.put("name", obj.name);
            notifyList.put(device);
        }
        JSObject deviceFoundResult = new JSObject();
        deviceFoundResult.put("devices", notifyList);
        notifyListeners("ecgDeviceFound", deviceFoundResult);
    }

    private void onHeartRate(Message msg) {
        ChHeartRate hr = (ChHeartRate) msg.obj;
        JSObject heart = new JSObject();
        heart.put("heartRate", hr.heartRate);
        notifyListeners("heartRate", heart);
    }

    @PluginMethod()
    public void initEcgPlugin(PluginCall call) {
        initPlugin();
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        deviceList = new ArrayList<>();
        int time = call.getInt("time");
        showToast("开始扫描");
        ChSdkManager.getInstance().startScan(-1);
    }

    @PluginMethod()
    public void restart() {
        Intent intent = new Intent(getActivity().getApplicationContext(), MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        getActivity().getApplicationContext().startActivity(intent);
        Runtime.getRuntime().exit(0);
    }

    @PluginMethod()
    public void analysisHrv(PluginCall call) throws JSONException {
        JSONArray intervalList = call.getArray("intervalList");
        short[] _intervalList = new short[intervalList.length()];
        for (int i = 0; i < intervalList.length(); i++) {
            _intervalList[i] = (short) intervalList.getInt(i);
        }

        JSONArray beatList = call.getArray("beatList");
        int[] _beatList = new int[beatList.length()];
        for (int i = 0; i < beatList.length(); i++) {
            _beatList[i] = beatList.getInt(i);
        }

        // short[] intervalList = {134,132,132,133,132,134,135,132,131,130,129,127,127,125,126,124,125,127,128,131,133,139,142,141,135,133,133,134,134,133,133,132,132,131,132,132,132,131,131,132,132,131,133,132,132,131,133,132,132,130,130,130,128,126,127,125,126,126,124,124,125,125,123,125,125,125,125,126,126,125,126,127,125,126,126,126,127,124,126,126,126,125,125,126,126,125,126,126,124,124,124,126,126,126,127,126,128,127,128,126,126,127,128,126,125,124,125,125,126,125,127,127,129,129,129,134,132,132,133,132,134,135,132,131,130,129,127,127,125,126,124,125,127,128,131,133,139,142,141,135,133,133,134,134,133,133,132,132,131,132,132,132,131,131,132,132,131,133,132,132,131,133,132,132,130,130,130,128,126,127,125,126,126,124,124,125,125,123,125,125,125,125,126,126,125,126,127,125,126,126,126,127,124,126,126,126,125,125,126,126,125,126,126,124,124,124,126,126,126,127,126,128,127,128,126,126,127,128,126,125,124,125,125,126,125,127,127,129,129,129,134,132,132,133,132,134,135,132,131,130,129,127,127,125,126,124,125,127,128,131,133,139,142,141,135,133,133,134,134,133,133,132,132,131,132,132,132,131,131,132,132,131,133,132,132,131,133,132,132,130,130,130,128,126,127,125,126,126,124,124,125,125,123,125,125,125,125,126,126,125,126,127,125,126,126,126,127,124,126,126,126,125,125,126,126,125,126,126,124,124,124,126,126,126,127,126,128,127,128,126,126,127,128,126,125,124,125,125,126,125,127,127,129,129,129,134,132,132,133,132,134,135,132,131,130,129,127,127,125,126,124,125,127,128,131,133,139,142,141,135,133,133,134,134,133,133,132,132,131,132,132,132,131,131,132,132,131,133,132,132,131,133,132,132,130,130,130,128,126,127,125,126,126,124,124,125,125,123,125,125,125,125,126,126,125,126,127,125,126,126,126,127,124,126,126,126,125,125,126,126,125,126,126,124,124,124,126,126,126,127,126,128,127,128,126,126,127,128,126,125,124,125,125,126,125,127,127,129,129,129,134,132,132,133,132,134,135,132,131,130,129,127,127,125,126,124,125,127,128,131,133,139,142,141,135,133,133,134,134,133,133,132,132,131,132,132,132,131,131,132,132,131,133,132,132,131,133,132,132,130,130,130,128,126,127,125,126,126,124,124,125,125,123,125,125,125,125,126,126,125,126,127,125,126,126,126,127,124,126,126,126,125,125,126,126,125,126,126,124,124,124,126,126,126,127,126,128,127,128,126,126,127,128,126,125,124,125,125,126,125,127,127,129,129,129};

        // int[] beatList = {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1};

        EcgHrvReport report = ChSdkManager.getInstance().analysisHrv(_intervalList, _beatList);


        if (report != null) {
            JSONObject finalReport = new JSONObject();
            finalReport.put("mean", report.mean);
            finalReport.put("sdnn", report.sdnn);
            finalReport.put("sdann", report.sdann);
            finalReport.put("sdnni", report.sdnni);
            finalReport.put("rmsssd", report.rmsssd);
            finalReport.put("pnn50", report.pnn50);
            finalReport.put("triangularIndex", report.triangularIndex);
            finalReport.put("tp", report.tp);
            finalReport.put("vlf", report.vlf);
            finalReport.put("lf", report.lf);
            finalReport.put("hf", report.hf);
            finalReport.put("lfNorm", report.lfNorm);
            finalReport.put("hfNorm", report.hfNorm);
            finalReport.put("ratioLHF", report.ratioLHF);
            JSONArray powerData = new JSONArray();
            for(float v: report.powerData) {
                powerData.put(v);
            }
            finalReport.put("powerData", powerData);
            JSONArray intervalStatistics = new JSONArray();
            for(float v: report.intervalStatistics) {
                intervalStatistics.put(v);
            }
            finalReport.put("intervalStatistics", intervalStatistics);
            JSObject result = new JSObject();
            result.put("data", finalReport);
            call.resolve(result);
        } else {
            Log.e("Report not exist", "haha");
            call.reject("Report not exist");
        }
    }

    @PluginMethod
    public void stopScan(PluginCall call) {
        ChSdkManager.getInstance().stopScan();
        deviceList = new ArrayList<>();
    }

    @PluginMethod()
    public void connect(PluginCall call) {
        String pid = call.getString("pid");
        Optional<ChScanResult> deviceToConnect = deviceList.stream().filter(item -> item.pid.equals(pid)).findFirst();
        if (deviceToConnect.isPresent()) {
            ChSdkManager.getInstance().connect(deviceToConnect.get());
            if (ChSdkManager.getInstance().isConnected(deviceToConnect.get().type)) {
                ChSdkManager.getInstance().disConnect(deviceToConnect.get());
            }
            ChSdkManager.getInstance().connect(deviceToConnect.get());
        }
    }

    @PluginMethod()
    public void startMonitor(PluginCall call) {
        String pid = call.getString("pid");
        Optional<ChScanResult> deviceToConnect = deviceList.stream().filter(item -> item.pid.equals(pid)).findFirst();
        if (deviceToConnect.isPresent()) {
            ChSdkManager.getInstance().startMonitor(deviceToConnect.get().type);
        }
    }

    @PluginMethod()
    public void stopMonitor(PluginCall call) {
        String pid = call.getString("pid");
        Optional<ChScanResult> deviceToConnect = deviceList.stream().filter(item -> item.pid.equals(pid)).findFirst();
        if (deviceToConnect.isPresent()) {
            ChSdkManager.getInstance().stopMonitor(deviceToConnect.get().type);
            ChSdkManager.getInstance().disConnect(deviceToConnect.get());
            ChSdkManager.getInstance().stopScan();
        }
    }

    private void checkLicense() {
        String storagePath;
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            storagePath = getActivity().getExternalFilesDir(null).toPath().toString();
        } else {
            // SD卡正常挂载（可读写）
            if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())) {
                storagePath = Environment.getExternalStorageDirectory().getPath() + File.separator + getActivity().getPackageName();
            } else {
                storagePath = Environment.getDataDirectory().getPath() + "/data/" + getActivity().getPackageName();
            }
        }

        Log.e("storage path", storagePath);


        ChSdkManager.getInstance().setFileStoragePath(storagePath);

        String companyId = "c1cf808c187e6816bfc4c2d4dc4b26f1";//配置自己的认证ID后才能使用

        int licenseState = ChSdkManager.getInstance().localActivate(companyId);
        if (licenseState != EcgLib.LICENSE_STATE_VALID) {
            // 远程认证，建议启动线程处理
            licenseState = ChSdkManager.getInstance().remoteActivate(companyId);
        }
        Log.e("licenseState", "checkLicense: " + licenseState);
        if (licenseState != EcgLib.LICENSE_STATE_VALID) {
            showToast("认证授权失败!!!");
        } else {
            showToast("认证授权成功!!!");
        }
    }

    public void showToast(String text) {
        Toast toast = Toast.makeText(getActivity(), text, Toast.LENGTH_SHORT);
        toast.show();
    }
}
