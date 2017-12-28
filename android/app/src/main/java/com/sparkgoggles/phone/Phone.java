package com.sparkgoggles.phone;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Phone extends ReactContextBaseJavaModule {
    private final String REACT_CLASS = "PhoneImpl";

    public Phone(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void toast(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}
