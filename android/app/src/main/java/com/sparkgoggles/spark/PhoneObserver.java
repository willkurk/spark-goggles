package com.sparkgoggles.spark;

import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.CallObserver;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

public class PhoneObserver implements CallObserver {
    private RCTDeviceEventEmitter events;

    public PhoneObserver(ReactApplicationContext reactApplicationContext) {
        events = reactApplicationContext.getJSModule(RCTDeviceEventEmitter.class);
    }

    @Override
    public void onRinging(Call call) {
        events.emit("phone:ringing", null);
    }

    @Override
    public void onConnected(Call call) {
        events.emit("phone:connected", null);
    }

    @Override
    public void onDisconnected(CallDisconnectedEvent event) {
        events.emit("phone:disconnected", null);
    }

    @Override
    public void onMediaChanged(MediaChangedEvent event) {
        events.emit("phone:media-changed", null);
    }
}
