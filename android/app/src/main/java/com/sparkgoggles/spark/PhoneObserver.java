package com.sparkgoggles.spark;

import android.util.Log;
import android.view.View;

import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.CallObserver;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

public class PhoneObserver implements CallObserver {
    private RCTDeviceEventEmitter events;
    
    View shareView;

    public PhoneObserver(RCTDeviceEventEmitter events, View shareView) {
        this.events = events;
	this.shareView = shareView;
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
    public void onMediaChanged(MediaChangedEvent mediaChangedEvent) {
        Log.d("PhoneObserver", "onMediaChanged");
        events.emit("phone:media-changed", CallSerializer.serialize(mediaChangedEvent.getCall()));
	if (mediaChangedEvent instanceof RemoteSendingSharingEvent) {
		if (((RemoteSendingSharingEvent) mediaChangedEvent).isSending()) {							mediaChangedEvent.getCall().setSharingRenderView(shareView);
		} else if (!((RemoteSendingSharingEvent) mediaChangedEvent).isSending()) {
			mediaChangedEvent.getCall().setSharingRenderView(null);
														                        }
																	                    }
    }

    @Override
    public void onCallMembershipChanged(CallMembershipChangedEvent event) {
	Log.d("PhoneObserver", "onCallMembershipChange");
	events.emit("phone:membership-changed", CallSerializer.serialize(event.getCall()));

    }
}
