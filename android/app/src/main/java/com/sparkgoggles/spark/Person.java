package com.sparkgoggles.spark;

import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.CallMembership;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class Person {
    public static WritableMap getOther(Call call) {
        CallMembership to = call.getTo();
        CallMembership from = call.getFrom();

        if (to.isInitiator()) {
            return toWritableMap(from);
        } else {
            return toWritableMap(to);
        }
    }

    public static WritableMap toWritableMap(CallMembership person) {
        WritableMap map = new WritableNativeMap();
        map.putString("id", person.getPersonId());
        map.putString("email", person.getEmail());
        map.putString("phoneNumber", person.getPhoneNumber());
        map.putBoolean("isSendingAudio", person.isSendingAudio());
        map.putBoolean("isSendingVideo", person.isSendingVideo());
        return map;
    }
}
