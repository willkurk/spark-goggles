package com.sparkgoggles.spark;

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
        events.emit("phone:ringing", Person.getOther(call));
    }

    @Override
    public void onConnected(Call call) {
        events.emit("phone:connected", Person.getOther(call));
    }

    @Override
    public void onDisconnected(CallDisconnectedEvent event) {
        events.emit("phone:disconnected", Person.getOther(event.getCall()));
    }

    @Override
    public void onMediaChanged(MediaChangedEvent event) {
        events.emit("phone:media-changed", Person.getOther(event.getCall()));
    }
}
