package com.sparkgoggles.phone;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.webex.wseclient.WseSurfaceView;

public class VideoView extends SimpleViewManager<WseSurfaceView> {
    public static final String REACT_CLASS = "VideoView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WseSurfaceView createViewInstance(ThemedReactContext reactContext) {
        return new WseSurfaceView(reactContext);
    }
}
