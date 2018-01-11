package com.sparkgoggles.spark;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.webex.wseclient.WseSurfaceView;
import com.webex.wseclient.grafika.GLRenderEntity;
import com.webex.wseclient.grafika.RenderThread;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

public class VideoView extends WseSurfaceView {
    public VideoView(ReactContext reactContext) {
        super(reactContext);
    }

    public void takeSnapshot() {
        GLRenderEntity gl = RenderThread.getInstance().getKernel().getRender();

        gl.saveFrame(new WseSurfaceView.FrameSaved() {
            @Override
            public void Done(Bitmap bitmap) {
                Log.d("VideoView", "We saved a bitmap!");
                writeSnapshotToFilesystem(bitmap);
            }
        });
    }

    private void writeSnapshotToFilesystem(Bitmap bitmap) {
        Context context = getContext();

        Date now = new Date();
        String filename = now.getTime() + ".jpg";
        String filesDir = context.getFilesDir().getAbsolutePath();
        String path = filesDir + "/" + filename;

        Log.d("VideoView", "About to send " + path);

        try {
            FileOutputStream out = context.openFileOutput(filename, Context.MODE_PRIVATE);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
            out.close();
            emitFile(path);
        } catch (FileNotFoundException error) {
            Log.e("VideoView", "Failed to get image file handle", error);
        } catch (IOException ioe) {
            Log.e("VideoView", "Failed to save file", ioe);
        }
    }

    private void emitFile(String path) {
        ReactContext reactContext = (ReactContext) getContext();

        WritableMap event = new WritableNativeMap();
        event.putString("path", "file://" + path);

        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "snapshot", event);
    }
}
