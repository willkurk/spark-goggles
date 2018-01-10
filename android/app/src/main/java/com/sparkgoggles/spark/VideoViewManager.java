package com.sparkgoggles.spark;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.webex.wseclient.WseSurfaceView;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class VideoViewManager extends SimpleViewManager<WseSurfaceView> {
    public static final String REACT_CLASS = "VideoView";
    private ThemedReactContext reactContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WseSurfaceView createViewInstance(final ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        return new WseSurfaceView(reactContext);
    }

    @ReactProp(name = "snapshot", defaultBoolean = false)
    public void setSnapshot(final WseSurfaceView view, boolean snapshot) {
        if (!snapshot) {
            return;
        }

        Log.d("VideoViewManager", "Registering view to listen for snapshot event.");

        EventService.register(new EventListener() {
            @Override
            public void onSnapshot(ReadableMap eventData) {
                Log.d("VideoViewManager", "Event Service triggered snapshot");

                view.saveFrame(new WseSurfaceView.FrameSaved() {
                    @Override
                    public void Done(Bitmap bitmap) {
                        Log.d("VideoViewManager", "We have a bitmap!");
                        writeFrameToFilesystem(reactContext, bitmap);
                    }
                });
            }
        });
    }

    private void writeFrameToFilesystem(ThemedReactContext reactContext, Bitmap bitmap) {
        DeviceEventManagerModule.RCTDeviceEventEmitter events = reactContext.getJSModule(
                DeviceEventManagerModule.RCTDeviceEventEmitter.class
        );

        Date now = new Date();
        DateFormat dateFmt = new SimpleDateFormat("yyyymmddhhmmss");
        String filename = dateFmt.format(now) + ".jpg";
        String filesDir = reactContext.getFilesDir().getAbsolutePath();
        String path = filesDir + "/" + filename;

        Log.d("VideoViewManager", "About to send " + path + " to phone:snapshot");

        try {
            FileOutputStream out = reactContext.openFileOutput(filename, Context.MODE_PRIVATE);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
            out.close();
            events.emit("phone:snapshot", "file://" + path);
        } catch (FileNotFoundException error) {
            Log.e("VideoViewManager", "Failed to get image file handle", error);
        } catch (IOException ioe) {
            Log.e("VideoViewManager", "Failed to save file", ioe);
        }
    }
}
