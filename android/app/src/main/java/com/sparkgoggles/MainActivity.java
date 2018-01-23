package com.sparkgoggles;

import com.facebook.react.ReactActivity;
import com.rnimmersive.RNImmersiveModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SparkGoggles";
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        if (hasFocus && RNImmersiveModule.getInstance() != null) {
            RNImmersiveModule.getInstance().emitImmersiveStateChangeEvent();
        }
    }
}
