package se2.rpgcompanion;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import im.delight.android.ddp.Meteor;
import im.delight.android.ddp.MeteorCallback;
import im.delight.android.ddp.MeteorSingleton;


public class ConnectingActivity extends Activity implements MeteorCallback {

    private Meteor mMeteor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_connecting);

        mMeteor = MeteorSingleton.createInstance(this, "ws://rpgcompanion.meteor.com/websocket");
        mMeteor.addCallback(this);
        mMeteor.connect();
    }

    @Override
    public void onConnect(boolean b) {
        Log.d("Meteor", "Connected. Signed in: " + b);
        Intent intent = new Intent(this, b ? HomeActivity.class : LoginActivity.class);
        startActivity(intent);
    }

    @Override
    public void onDisconnect() {

    }

    @Override
    public void onException(Exception e) {
        // Display Error
        e.printStackTrace();
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
