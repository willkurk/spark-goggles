package com.sparkgoggles.phone;

import android.graphics.Color;
import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class PhoneManager extends SimpleViewManager<TextView> {
    public static final String REACT_CLASS = "Phone";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected TextView createViewInstance(ThemedReactContext reactContext) {
        TextView textView = new TextView(reactContext);
        textView.setText("This is the <Phone /> component!");
        textView.setTextColor(Color.BLACK);
        textView.setBackgroundColor(Color.YELLOW);
        return textView;
    }
}
