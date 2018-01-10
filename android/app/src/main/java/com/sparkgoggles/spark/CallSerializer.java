package com.sparkgoggles.spark;

import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.CallMembership;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class CallSerializer {
    public static WritableMap serialize(Call call) {
        WritableMap map = new WritableNativeMap();
        map.putMap("to", serializeMember(call.getTo()));
        map.putMap("from", serializeMember(call.getFrom()));
        map.putString("direction", call.getDirection().name());
        return map;
    }

    public static WritableMap serializeMember(CallMembership member) {
        WritableMap map = new WritableNativeMap();
        map.putString("id", member.getPersonId());
        map.putString("email", member.getEmail());
        map.putString("phoneNumber", member.getPhoneNumber());
        map.putBoolean("isInitiator", member.isInitiator());
        map.putBoolean("isSendingAudio", member.isSendingAudio());
        map.putBoolean("isSendingVideo", member.isSendingVideo());
        return map;
    }
}
