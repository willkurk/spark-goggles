package com.sparkgoggles.spark;

import com.facebook.react.bridge.ReadableMap;

public abstract class EventListener {
    public abstract void onSnapshot(ReadableMap eventData);
}
