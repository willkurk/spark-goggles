package com.sparkgoggles.spark;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.webex.wseclient.WseSurfaceView;
import com.webex.wseclient.grafika.GLRenderEntity;
import com.webex.wseclient.grafika.RenderThread;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
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
        Log.d("VideoViewManager", "Instance created");
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
                takeSnapshot(view);
            }
        });
    }

    private void takeSnapshot(final WseSurfaceView view) {
        GLRenderEntity gl = RenderThread.getInstance().getKernel().getRender();

        gl.saveFrame(new WseSurfaceView.FrameSaved() {
            @Override
            public void Done(Bitmap bitmap) {
                Log.d("VideoViewManager", "We saved a bitmap!");
                writeFrameToFilesystem(bitmap);
            }
        });
    }

    private void writeFrameToFilesystem(Bitmap bitmap) {
        DeviceEventManagerModule.RCTDeviceEventEmitter events = reactContext.getJSModule(
                DeviceEventManagerModule.RCTDeviceEventEmitter.class
        );

        Date now = new Date();
        String filename = now.getTime() + ".jpg";
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
