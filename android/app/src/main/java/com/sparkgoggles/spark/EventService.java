package com.sparkgoggles.spark;

import android.util.Log;

import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

public class EventService {
    private static List<EventListener> myListeners = new ArrayList<EventListener>();

    public static void register(EventListener eventListener) {
        myListeners.add(eventListener);
    }

    public static void emit(String eventName, ReadableMap eventData) {
        for (EventListener listener : myListeners) {
            if (eventName == "snapshot") {
                Log.d("EventService", "onSnapshot");
                listener.onSnapshot(eventData);
            }
        }
    }
}
