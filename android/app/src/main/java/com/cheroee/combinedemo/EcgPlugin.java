package com.cheroee.combinedemo;

import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.cheroee.cherosdk.ChMsg;
import com.cheroee.cherosdk.ChSdkManager;
import com.cheroee.cherosdk.bluetooth.ChScanResult;
import com.cheroee.cherosdk.ecg.model.ChEcgSmoothedData;
import com.cheroee.cherosdk.ecg.model.ChHeartRate;
import com.ecgparser.healthcloud.ecgparser.EcgLib;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.util.ArrayList;
import java.util.Optional;

@CapacitorPlugin(name = "Ecg")
public class EcgPlugin extends Plugin {

    String filePath = null;
    long lastTime = 0;
    private Handler mHandler;
    private ArrayList<ChScanResult> deviceList;

    @Override
    public void load() {
        super.load();
        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                onReceviceEvent(msg);
            }
        };
        ChSdkManager.getInstance().init(mHandler, getActivity().getApplicationContext());
//        checkLicense();
//
//        // SD卡正常挂载（可读写）
//        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())) {
//            filePath = Environment.getExternalStorageDirectory().getPath() + File.separator + getActivity().getPackageName() + "/file";
//        } else {
//            filePath = Environment.getDataDirectory().getPath() + "/data/" + getActivity().getPackageName() + "/file";
//        }
////        }
//        new File(filePath).mkdirs();
        // ChSdkManager.getInstance().startScan(30000);
    }

    private void onReceviceEvent(Message msg) {
        Log.e("EVENT", String.format("%d", msg.what));
        JSObject raw = new JSObject();
        raw.put("what", msg.what);
        raw.put("arg1", msg.arg1);
        raw.put("arg2", msg.arg2);
        notifyListeners("ecgRawMessage", raw);
        showToast("响应时间" + String.format("%d", msg.what));
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
            case ChMsg.MSG_ECG_HR:
                onHeartRate(msg);
                break;
        }
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
            for (int v: data.values) {
                dataArr.put(v);
            }
            smoothData.put("data", dataArr);
            notifyListeners("ecgRawData", smoothData);
        }

    }

    private void onScanResult(ChScanResult result) {
        showToast("扫描到了！");

        ChScanResult target = null;
        for (ChScanResult obj: deviceList) {
            if (result.pid.equals(obj.pid)) {
                target = obj;
                break;
            }
        }
        if (target == null) {
            deviceList.add(result);
        }
        JSArray notifyList = new JSArray();
        for (ChScanResult obj: deviceList) {
            JSObject device = new JSObject();
            device.put("pid", obj.pid);
            device.put("mac", obj.mac);
            device.put("name", obj.name);
            notifyList.put(device);
        }
        JSObject deviceFoundResult = new JSObject();
        deviceFoundResult.put("devices", notifyList);
        notifyListeners("ecgDeviceFound", deviceFoundResult);
        Log.e("SCAN", "scan result : " + result.pid + " Length: " + deviceList.size());
    }

    private void onHeartRate(Message msg) {
        ChHeartRate hr = (ChHeartRate) msg.obj;
        JSObject heart = new JSObject();
        heart.put("heartRate", hr.heartRate);
        notifyListeners("heartRate", heart);
    }

    @PluginMethod()
    public void startScan(PluginCall call) {
        deviceList = new ArrayList<>();
        int time = call.getInt("time");
        ChSdkManager.getInstance().startScan(-1);
    }

    @PluginMethod()
    public void connect(PluginCall call) {
        String pid = call.getString("pid");
        Log.i("plugin connect", pid);
        Optional<ChScanResult> deviceToConnect = deviceList.stream().filter(item -> item.pid.equals(pid)).findFirst();
        if (deviceToConnect.isPresent()) {
            Log.i("plugin connect found", pid);
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
        Log.i("plugin monitor", pid);
        Optional<ChScanResult> deviceToConnect = deviceList.stream().filter(item -> item.pid.equals(pid)).findFirst();
        if (deviceToConnect.isPresent()) {
            Log.i("plugin connect monitor", pid);
            ChSdkManager.getInstance().startMonitor(deviceToConnect.get().type);
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
