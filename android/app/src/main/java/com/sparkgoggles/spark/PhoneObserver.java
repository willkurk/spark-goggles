package com.sparkgoggles.spark;

import android.util.Log;

import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.CallObserver;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

public class PhoneObserver implements CallObserver {
    private RCTDeviceEventEmitter events;

    public PhoneObserver(RCTDeviceEventEmitter events) {
        this.events = events;
    }

    @Override
    public void onRinging(Call call) {
        Log.d("PhoneObserver", "onRinging");
        events.emit("phone:ringing", CallSerializer.serialize(call));
    }

    @Override
    public void onConnected(Call call) {
        Log.d("PhoneObserver", "onConnected");
        events.emit("phone:connected", CallSerializer.serialize(call));
    }

    @Override
    public void onDisconnected(CallDisconnectedEvent event) {
        Log.d("PhoneObserver", "onDisconnected");
        events.emit("phone:disconnected", CallSerializer.serialize(event.getCall()));
    }

    @Override
    public void onMediaChanged(MediaChangedEvent event) {
        Log.d("PhoneObserver", "onMediaChanged");
        events.emit("phone:media-changed", CallSerializer.serialize(event.getCall()));
    }
}
