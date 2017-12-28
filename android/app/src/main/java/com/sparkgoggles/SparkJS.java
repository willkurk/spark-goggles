package com.sparkgoggles;

import android.app.Activity;
import android.app.Application;

import com.ciscospark.androidsdk.CompletionHandler;
import com.ciscospark.androidsdk.Result;
import com.ciscospark.androidsdk.Spark;
import com.ciscospark.androidsdk.auth.JWTAuthenticator;
import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.MediaOption;
import com.ciscospark.androidsdk.phone.Phone;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SparkJS extends ReactContextBaseJavaModule {
    private final String REACT_CLASS = "Spark";

    private final String E_REGISTER_ERROR = "E_REGISTER_ERROR";
    private final String E_NO_CALL_IN_PROGRESS = "E_NO_CALL_IN_PROGRESS";
    private final String E_CALL_ALREADY_IN_PROGRESS = "E_CALL_ALREADY_IN_PROGRESS";
    private final String E_NULL_JWT = "E_NULL_JWT";
    private final String E_DIAL_ERROR = "E_DIAL_ERROR";
    private final String E_HANGUP_ERROR = "E_HANGUP_ERROR";
    private final String E_AUTHENTICATION_ERROR = "E_AUTHENTICATION_ERROR";

    private JWTAuthenticator authenticator;
    private Call activeCall;
    private Spark spark;

    public SparkJS(ReactApplicationContext reactContext) {
        super(reactContext);
        authenticator = new JWTAuthenticator();
    }

    // We'll cache the spark instance in an instance variable.
    public Spark getSpark() {
        Activity activity = getCurrentActivity();

        if (spark != null) {
            return spark;
        }

        // FIXME: Gracefully handle the case where the activity is null!
        if (activity == null) {
            throw new java.lang.Error("Activity is null, so Spark can't be initialized");
        }

        Application application = activity.getApplication();
        spark = new Spark(application, authenticator);
        return spark;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void authenticate(String jwt, final Promise promise) {
        if (jwt == null) {
            promise.reject(E_NULL_JWT, "The JWT cannot be null.");
            return;
        }

        if (!authenticator.isAuthorized()) {
            authenticator.authorize(jwt);
        }

        authenticator.getToken(new CompletionHandler<String>() {
            @Override
            public void onComplete(Result<String> result) {
                if (result.isSuccessful()) {
                    promise.resolve(result.getData());
                } else {
                    promise.reject(E_AUTHENTICATION_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void register(final Promise promise) {
        Phone phone = getSpark().phone();

        phone.register(new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                if (result.isSuccessful()) {
                    promise.resolve(true);
                } else {
                    promise.reject(E_REGISTER_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public Boolean hasActiveCall() {
        return activeCall != null;
    }

    @ReactMethod
    public void dial(String address, final Promise promise) {
        if (this.hasActiveCall()) {
            promise.reject(E_CALL_ALREADY_IN_PROGRESS, "There is already a call in progress.");
            return;
        }

        Phone phone = getSpark().phone();
        MediaOption mediaOption = MediaOption.audioOnly();

        phone.dial(address, mediaOption, new CompletionHandler<Call>() {
            @Override
            public void onComplete(Result<Call> result) {
                if (result.isSuccessful()) {
                    activeCall = result.getData();
                    promise.resolve(true);
                } else {
                    promise.reject(E_DIAL_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void hangup(final Promise promise) {
        if (!this.hasActiveCall()) {
            promise.reject(E_NO_CALL_IN_PROGRESS, "There is not a call in progress.");
            return;
        }

        activeCall.hangup(new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                if (result.isSuccessful()) {
                    activeCall = null;
                    promise.resolve(true);
                } else {
                    promise.reject(E_HANGUP_ERROR, result.getError().toString());
                }

            }
        });
    }
}
