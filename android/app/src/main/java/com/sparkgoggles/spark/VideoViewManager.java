package com.sparkgoggles.spark;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

public class VideoViewManager extends SimpleViewManager<VideoView> {
    public static final String REACT_CLASS = "VideoView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected VideoView createViewInstance(ThemedReactContext reactContext) {
        return new VideoView(reactContext);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "snapshot",
                        MapBuilder.of("phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onSnapshot")
                        )
                )
                .build();
    }
}
