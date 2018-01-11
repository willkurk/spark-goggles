package com.sparkgoggles.spark;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Matrix;
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

    /**
     * Pull a frame off of the video feed, save it, and broadcast the path to the
     * React component's `onSnapshot` function.
     */
    public void takeSnapshot() {
        GLRenderEntity gl = RenderThread.getInstance().getKernel().getRender();

        gl.saveFrame(new WseSurfaceView.FrameSaved() {
            @Override
            public void Done(Bitmap source) {
                Log.d("VideoView", "We saved a bitmap!");
                Bitmap result = flipBitmap(source);
                WritableMap event = new WritableNativeMap();

                try {
                    String path = writeSnapshotToFilesystem(result);
                    event.putString("path", "file://" + path);
                } catch (FileNotFoundException error) {
                    Log.e("VideoView", "Failed to get image file handle", error);
                    event.putString("error", "Failed to get image file handle.");
                } catch (IOException ioe) {
                    Log.e("VideoView", "Failed to save file", ioe);
                    event.putString("error", "Failed to save image file.");
                }

                sendEvent(event);
            }
        });
    }

    /**
     * When taken, images are upside-down. We need to fix 'em.
     */
    private Bitmap flipBitmap(Bitmap source) {
        int width = source.getWidth();
        int height = source.getHeight();

        int centerX = Math.round(width / 2f);
        int centerY = Math.round(height / 2f);

        Matrix matrix = new Matrix();
        matrix.postScale(-1, -1, centerX, centerY);

        return Bitmap.createBitmap(source, 0, 0, width, height, matrix, true);
    }

    /**
     * Save the bitmap to the filesystem and return the path to the file.
     */
    private String writeSnapshotToFilesystem(Bitmap bitmap) throws IOException {
        Context context = getContext();

        Date now = new Date();
        String filename = now.getTime() + ".jpg";
        String filesDir = context.getFilesDir().getAbsolutePath();
        String path = filesDir + "/" + filename;

        Log.d("VideoView", "About to send " + path);

        FileOutputStream out = context.openFileOutput(filename, Context.MODE_PRIVATE);
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
        out.close();
        return path;
    }

    /**
     * Invoke the `onSnapshot` callback on the React component using magic.
     */
    private void sendEvent(WritableMap event) {
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "snapshot", event);
    }
}
