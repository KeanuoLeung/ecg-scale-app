package com.cheroee.combinedemo;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.provider.Settings;

/**
 * Created by zhuyunbin on 2017/11/21.
 */

public class PermissionController {

    public static final boolean isLocationEnable(Context context) {
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        boolean networkProvider = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        boolean gpsProvider = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        return networkProvider || gpsProvider;
    }

    private static final int REQUEST_CODE_LOCATION_SETTINGS = 2;

    public static void setLocationService(Activity activity) {
        Intent locationIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        activity.startActivityForResult(locationIntent, REQUEST_CODE_LOCATION_SETTINGS);
    }
}
