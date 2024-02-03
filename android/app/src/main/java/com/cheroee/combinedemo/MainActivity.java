package com.cheroee.combinedemo;

import android.Manifest;
import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.cheroee.cherosdk.ChMsg;
import com.cheroee.cherosdk.ChSdkManager;
import com.cheroee.cherosdk.bluetooth.ChScanResult;
import com.ecgparser.healthcloud.ecgparser.EcgLib;
import com.getcapacitor.BridgeActivity;

import java.io.File;

public class MainActivity extends BridgeActivity {
    private static final int CODE_REQUEST_ACCESS_COARSE_LOCATION = 101;

    private static final int CODE_REQUEST_LOCATION_SETTINGS = 102;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(EcgPlugin.class);
        if (Build.VERSION.SDK_INT >= 23) {
            //校验是否已具有模糊定位权限
            if (ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(MainActivity.this,
                        new String[]{android.Manifest.permission.ACCESS_COARSE_LOCATION, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_PHONE_STATE},
                        CODE_REQUEST_ACCESS_COARSE_LOCATION);
            } else {
            }
        } else {
            //系统不高于6.0直接执行
        }
        super.onCreate(savedInstanceState);

//        Handler mHandler = new Handler() {
//            @Override
//            public void handleMessage(Message msg) {
//                onReceviceEvent(msg);
//            }
//        };
//        //初始化
//        ChSdkManager.getInstance().init(mHandler, getApplicationContext());
//        ChSdkManager.getInstance().startScan(30000);
    }

    private void onReceviceEvent(Message msg) {
        Log.e("EVENT", String.format("%d", msg.what));
        showToast("响应时间" + String.format("%d", msg.what));
        switch (msg.what) {
            case ChMsg.MSG_SCAN_START:
                // showToast("扫描开始");
                break;
            case ChMsg.MSG_SCAN_RESULT:
                // onScanResult((ChScanResult) msg.obj);
                break;
            case ChMsg.MSG_SCAN_FAIL:
                Log.e("扫描失败", String.format("%d", msg.arg1));
                break;
        }
    }

    public void showToast(String text) {
        Toast toast = Toast.makeText(this, text, Toast.LENGTH_SHORT);
        toast.show();
    }

    @Override
    public void onResume() {
        super.onResume();
        // checkPermission();
    }

    /*
                   校验蓝牙权限
                  */
    private void checkPermission() {
        if (Build.VERSION.SDK_INT >= 23) {
            //校验是否已具有模糊定位权限
            if (ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(MainActivity.this,
                        new String[]{android.Manifest.permission.ACCESS_COARSE_LOCATION, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_PHONE_STATE},
                        CODE_REQUEST_ACCESS_COARSE_LOCATION);
            } else {
                //具有权限
                Log.e("HASPERMISSION", "haha");
            }
        } else {
            //系统不高于6.0直接执行
        }
    }

    /**
     * 对返回的值进行处理，相当于StartActivityForResult
     *
     * @param requestCode
     * @param permissions
     * @param grantResults
     */

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        doNext(requestCode, grantResults);
    }

//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (requestCode == CODE_REQUEST_LOCATION_SETTINGS) {
//            if (PermissionController.isLocationEnable(this)) {
//                //定位已打开的处理
//            } else {
//                Toast.makeText(this, "onActivityResult: 搜索BLE设备需要定位！", Toast.LENGTH_SHORT).show();
//            }
//        } else {
//            super.onActivityResult(requestCode, resultCode, data);
//        }
//    }

    private void doNext(int requestCode, int[] grantResults) {
        if (grantResults != null && grantResults.length > 0) {
            if (requestCode == CODE_REQUEST_ACCESS_COARSE_LOCATION) {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "搜索BLE设备需要定位！", Toast.LENGTH_SHORT).show();
                } else {
                    denyPermission();
                }

                if (grantResults[1] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "License 认证需要存储权限！", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "未授权：License 认证需要存储权限！", Toast.LENGTH_SHORT).show();
                }

                if (grantResults[2] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "未授权：License 认证需要读取设备信息！", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "未授权：License 认证需要读取设备信息！", Toast.LENGTH_SHORT).show();
                }
            }
        }

        if (ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
        } else {
            showToast("权限已授予！！");
        }
    }

    private void denyPermission() {
        Toast.makeText(this, "未授权：搜索BLE设备需要定位！", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDestroy() {
        ChSdkManager.getInstance().release(); //用不到蓝牙时，请主动调用release释放所有蓝牙连接，并且清除所有Handler消息
        super.onDestroy();
    }
}
