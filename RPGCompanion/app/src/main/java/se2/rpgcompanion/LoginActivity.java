package se2.rpgcompanion;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import im.delight.android.ddp.Meteor;
import im.delight.android.ddp.MeteorCallback;
import im.delight.android.ddp.MeteorSingleton;
import im.delight.android.ddp.ResultListener;

import static android.Manifest.permission.READ_CONTACTS;

/**
 * A login screen that offers login via username/password.
 */
public class LoginActivity extends Activity implements MeteorCallback {

    private Meteor mMeteor = null;
    // UI references.
    private EditText mUsernameView;
    private EditText mPasswordView;
    private View mLoginFormView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Set up the login form.
        mUsernameView = (EditText) findViewById(R.id.username);
        mPasswordView = (EditText) findViewById(R.id.password);
        mPasswordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == R.id.login || id == EditorInfo.IME_NULL) {
                    attemptLogin();
                    return true;
                }
                return false;
            }
        });

        // Reset errors.
        mUsernameView.setError(null);
        mPasswordView.setError(null);

        Button mUsernameSignInButton = (Button) findViewById(R.id.username_sign_in_button);
        mUsernameSignInButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });

        mLoginFormView = findViewById(R.id.login_form);
    }

    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid username, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private void attemptLogin() {

        // Store values at the time of the login attempt.
        String username = mUsernameView.getText().toString();
        String password = mPasswordView.getText().toString();

        if (validateUsernameAndPassword(username, password)) {
            mMeteor = MeteorSingleton.hasInstance()
                    ? MeteorSingleton.getInstance()
                    : MeteorSingleton.createInstance(this, getString(R.string.server_ws_url));

            mMeteor.addCallback(this);

            if (mMeteor.isConnected()) {
                mMeteor.registerAndLogin(username, null, password, new ResultListener() {

                    @Override
                    public void onSuccess(String s) {
                        launchHomeActivity();
                    }

                    @Override
                    public void onError(String s, String s1, String s2) {
                        mUsernameView.setError(s);
                    }
                });
            }
        }
    }

    private boolean validateUsernameAndPassword(String username, String password) {
        boolean valid = true;

        // Reset errors.
        mUsernameView.setError(null);
        mPasswordView.setError(null);

        // Check for a valid password, if the user entered one.
        if (!TextUtils.isEmpty(password) && !AccountValidation.isValidPassword(password)) {
            mPasswordView.setError(getString(R.string.error_invalid_password));
            valid = false;
        }

        // Check for a valid username.
        if (TextUtils.isEmpty(username)) {
            mUsernameView.setError(getString(R.string.error_field_required));
            valid = false;
        } else if (!AccountValidation.isValidUsername(username)) {
            mUsernameView.setError(getString(R.string.error_invalid_username));
            valid = false;
        }

        return valid;
    }

    private void launchHomeActivity() {
        Intent homeIntent = new Intent(this, HomeActivity.class);
        startActivity(homeIntent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onConnect(boolean b) {

    }

    @Override
    public void onDisconnect() {

    }

    @Override
    public void onException(Exception e) {

    }

    @Override
    public void onDataAdded(String s, String s1, String s2) {

    }

    @Override
    public void onDataChanged(String s, String s1, String s2, String s3) {

    }

    @Override
    public void onDataRemoved(String s, String s1) {

    }
}

