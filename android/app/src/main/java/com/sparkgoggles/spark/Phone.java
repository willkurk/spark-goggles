package com.sparkgoggles.spark;

import android.app.Activity;
import android.app.Application;
import android.util.Log;
import android.util.Pair;
import android.view.View;

import com.ciscospark.androidsdk.CompletionHandler;
import com.ciscospark.androidsdk.Result;
import com.ciscospark.androidsdk.Spark;
import com.ciscospark.androidsdk.auth.OAuthAuthenticator;
import com.ciscospark.androidsdk.phone.Call;
import com.ciscospark.androidsdk.phone.MediaOption;
import com.ciscospark.androidsdk.phone.Phone.IncomingCallListener;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;
import com.facebook.react.uimanager.util.ReactFindViewUtil;
import com.sparkgoggles.BuildConfig;


public class Phone extends ReactContextBaseJavaModule {
    private final String REACT_CLASS = "Phone";

    private final String E_REGISTER_ERROR = "E_REGISTER_ERROR";
    private final String E_CALL_ALREADY_IN_PROGRESS = "E_CALL_ALREADY_IN_PROGRESS";
    private final String E_DIAL_ERROR = "E_DIAL_ERROR";
    private final String E_HANGUP_ERROR = "E_HANGUP_ERROR";
    private final String E_AUTHENTICATION_ERROR = "E_AUTHENTICATION_ERROR";
    private final String E_ANSWER_ERROR = "E_ANSWER_ERROR";
    private final String E_REJECT_ERROR = "E_REJECT_ERROR";

    private final String clientId = BuildConfig.SPARK_CLIENT_ID;
    private final String clientSecret = BuildConfig.SPARK_CLIENT_SECRET;
    private final String scope = BuildConfig.SPARK_SCOPE;
    private final String redirectUri = BuildConfig.SPARK_REDIRECT_URI;

    private Call activeCall;
    private Call incomingCall;
    private Spark spark;
    private OAuthAuthenticator authenticator;
    private RCTDeviceEventEmitter events;

    public Phone(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public void initialize() {
        Activity activity = getCurrentActivity();
        Application application = activity.getApplication();

        events = getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class);
        authenticator = new OAuthAuthenticator(clientId, clientSecret, scope, redirectUri);
        spark = new Spark(application, authenticator);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void takeSnapshot(String nativeId) {
        Log.d("Phone", "About to capture snapshot");
        VideoView view = (VideoView) findViewById(nativeId);
        view.takeSnapshot();
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
                        Log.w("Phone", "An error occurred during authentication");
                        promise.reject(E_AUTHENTICATION_ERROR, result.getError().toString());
                    }
                }
            });
        }
    }

    @ReactMethod
    private void getAccessToken(final Promise promise) {
        if (!authenticator.isAuthorized()) {
            promise.resolve(null);
            return;
        }

        authenticator.getToken(new CompletionHandler<String>() {
            @Override
            public void onComplete(Result<String> result) {
                if (result.isSuccessful()) {
                    promise.resolve(result.getData());
                } else {
                    Log.w("Phone", "An error occurred while getting the token");
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
                    setupIncomingCallListener();
                    promise.resolve(true);
                } else {
                    Log.w("Phone", "An error occurred when registering");
                    promise.reject(E_REGISTER_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void dial(String address, String localViewId, String remoteViewId, final String sharingViewId, final Promise promise) {
        if (getActiveCall() != null) {
            promise.reject(E_CALL_ALREADY_IN_PROGRESS, "There is already a call in progress.");
            return;
        }

        spark.phone().dial(address, getMediaOption(localViewId, remoteViewId, sharingViewId), new CompletionHandler<Call>() {
            @Override
            public void onComplete(Result<Call> result) {
                if (result.isSuccessful()) {
                    Call call = result.getData();
                    call.setObserver(new PhoneObserver(events, findViewById(sharingViewId)));
                    activeCall = call;
                    promise.resolve(true);
                } else {
                    Log.w("Phone", "An error occurred when dialing up the call");
                    promise.reject(E_DIAL_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void hangup(final Promise promise) {
        Call call = getActiveCall();

        if (call == null) {
            promise.resolve(true);
            return;
        }

        call.hangup(new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                if (result.isSuccessful()) {
                    activeCall = null;
                    promise.resolve(true);
                } else {
                    Log.w("Phone", "An error occurred when hanging up the call");
                    promise.reject(E_HANGUP_ERROR, result.getError().toString());
                }

            }
        });
    }

    @ReactMethod
    public void answerIncomingCall(String localViewId, String remoteViewId, final String sharingViewId, final Promise promise) {
        incomingCall.answer(getMediaOption(localViewId, remoteViewId, sharingViewId), new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                if (result.isSuccessful()) {
                    activeCall = incomingCall;
                    incomingCall = null;
		    activeCall.setObserver(new PhoneObserver(events, findViewById(sharingViewId)));
                    promise.resolve(true);
                } else {
                    Log.w("Phone", "An error occurred when accepting the call");
                    events.emit("phone:disconnected", CallSerializer.serialize(incomingCall));
                    incomingCall = null;
                    promise.reject(E_ANSWER_ERROR, result.getError().toString());
                }
            }
        });
    }

    @ReactMethod
    public void rejectIncomingCall(final Promise promise) {
        incomingCall.reject(new CompletionHandler<Void>() {
            @Override
            public void onComplete(Result<Void> result) {
                events.emit("phone:disconnected", CallSerializer.serialize(incomingCall));
                incomingCall = null;

                if (result.isSuccessful()) {
                    promise.resolve(true);
                } else {
                    Log.w("Phone", "An error occurred when rejecting the call");
                    promise.reject(E_REJECT_ERROR, result.getError().toString());
                }
            }
        });
    }

    private void setupIncomingCallListener() {
        spark.phone().setIncomingCallListener(new IncomingCallListener() {
            @Override
            public void onIncomingCall(final Call call) {
                incomingCall = call;

                Log.d("Phone", "Call incoming");
                call.setObserver(new PhoneObserver(events, null));

                // This puts the call in the ringing state.
                call.acknowledge(new CompletionHandler<Void>() {
                    @Override
                    public void onComplete(Result<Void> result) {
                        Log.d("Phone", "Call acknowledged");
                    }
                });
            }
        });
    }

    private Call getActiveCall() {
        if (activeCall == null) {
            return null;
        }

        if (activeCall.getStatus() == Call.CallStatus.DISCONNECTED) {
            activeCall = null;
            return null;
        }

        return activeCall;
    }

    private MediaOption getMediaOption(String localViewId, String remoteViewId, String sharingViewId) {
        View localView = findViewById(localViewId);
        View remoteView = findViewById(remoteViewId);
	View sharingView = findViewById(sharingViewId);
        return MediaOption.audioVideoSharing(new Pair<>(localView, remoteView), sharingView);
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
