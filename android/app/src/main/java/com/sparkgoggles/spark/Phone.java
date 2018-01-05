package com.sparkgoggles.spark;

import android.app.Activity;
import android.app.Application;
import android.view.View;

import com.ciscospark.androidsdk.CompletionHandler;
import com.ciscospark.androidsdk.Result;
import com.ciscospark.androidsdk.Spark;
import com.ciscospark.androidsdk.auth.OAuthAuthenticator;
import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.MediaOption;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.util.ReactFindViewUtil;
import com.sparkgoggles.BuildConfig;

public class Phone extends ReactContextBaseJavaModule {
    private final String REACT_CLASS = "Phone";

    private final String E_REGISTER_ERROR = "E_REGISTER_ERROR";
    private final String E_CALL_ALREADY_IN_PROGRESS = "E_CALL_ALREADY_IN_PROGRESS";
    private final String E_DIAL_ERROR = "E_DIAL_ERROR";
    private final String E_HANGUP_ERROR = "E_HANGUP_ERROR";
    private final String E_AUTHENTICATION_ERROR = "E_AUTHENTICATION_ERROR";

    private final String clientId = BuildConfig.SPARK_CLIENT_ID;
    private final String clientSecret = BuildConfig.SPARK_CLIENT_SECRET;
    private final String scope = BuildConfig.SPARK_SCOPE;
    private final String redirectUri = BuildConfig.SPARK_REDIRECT_URI;

    private Call activeCall;
    private Spark spark;
    private OAuthAuthenticator authenticator;

    public Phone(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public void initialize() {
        Activity activity = getCurrentActivity();
        Application application = activity.getApplication();

        authenticator = new OAuthAuthenticator(clientId, clientSecret, scope, redirectUri);
        spark = new Spark(application, authenticator);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void authenticate(String code, final Promise promise) {
        if (authenticator.isAuthorized()) {
            getAccessToken(promise);
        } else {
            authenticator.authorize(code, new CompletionHandler<Void>() {
                @Override
                public void onComplete(Result<Void> result) {
                    if (result.isSuccessful()) {
                        getAccessToken(promise);
                    } else {
                        promise.reject(E_AUTHENTICATION_ERROR, result.getError().toString());
                    }
                }
            });
        }
    }

    @ReactMethod
    private void getAccessToken(final Promise promise) {
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
        spark.phone().register(new CompletionHandler<Void>() {
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
    public void dial(String address, String localViewId, String remoteViewId, final Promise promise) {
        if (getActiveCall() != null) {
            promise.reject(E_CALL_ALREADY_IN_PROGRESS, "There is already a call in progress.");
            return;
        }

        View localView = findViewById(localViewId);
        View remoteView = findViewById(remoteViewId);

        MediaOption mediaOption = MediaOption.audioVideo(localView, remoteView);

        spark.phone().dial(address, mediaOption, new CompletionHandler<Call>() {
            @Override
            public void onComplete(Result<Call> result) {
                if (result.isSuccessful()) {
                    setActiveCall(result.getData());
                    promise.resolve(true);
                } else {
                    promise.reject(E_DIAL_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void hangup(final Promise promise) {
        Call activeCall = getActiveCall();

        if (activeCall == null) {
            promise.resolve(true);
            return;
        }

        activeCall.hangup(new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                if (result.isSuccessful()) {
                    clearActiveCall();
                    promise.resolve(true);
                } else {
                    promise.reject(E_HANGUP_ERROR, result.getError().toString());
                }

            }
        });
    }

    private Call getActiveCall() {
        if (activeCall == null) {
            return null;
        }

        if (activeCall.getStatus() == Call.CallStatus.DISCONNECTED) {
            clearActiveCall();
            return null;
        }

        return activeCall;
    }

    private void clearActiveCall() {
        activeCall = null;
    }

    private void setActiveCall(Call call) {
        call.setObserver(new PhoneObserver(getReactApplicationContext()));
        activeCall = call;
    }

    private View findViewById(String nativeId) {
        Activity activity = getCurrentActivity();
        View rootView = activity.getWindow().getDecorView().getRootView();
        View result = ReactFindViewUtil.findView(rootView, nativeId);

        if (result == null) {
            throw new Error("Failed to locate a view with ID: " + nativeId);
        }

        return result;
    }
}
