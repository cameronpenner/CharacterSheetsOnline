package se2.rpgcompanion;

import android.app.Fragment;
import android.app.FragmentManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import im.delight.android.ddp.Meteor;
import im.delight.android.ddp.MeteorCallback;
import im.delight.android.ddp.MeteorSingleton;
import se2.rpgcompanion.dummy.DummyContent;

public class HomeActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener,
        LoginFragment.OnSuccessfulLoginListener,
        CharacterFragment.OnListFragmentInteractionListener,
        CampaignListFragment.OnCampaignListFragmentInteractionListener,
        CampaignFragment.OnCampaignFragmentInteractionListener,
        MeteorCallback
{

    private Meteor mMeteor;
    private List<Campaign> campaigns;

    private CampaignListFragment campaignListFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupHomeLayout();

        campaigns = new ArrayList<Campaign>();

        // Setup Meteor
        if (!MeteorSingleton.hasInstance()) {
            // Create singleton and wait for callback to do everything else
            mMeteor = MeteorSingleton.createInstance(this, getString(R.string.server_ws_url));
            mMeteor.addCallback(this);
            mMeteor.connect();
        }
        else {
            mMeteor = MeteorSingleton.getInstance();
            mMeteor.addCallback(this);

            if (!mMeteor.isConnected()) {
                mMeteor.reconnect();
            }
        }

        if(!mMeteor.isLoggedIn()) {
            launchLoginFragment();
        }
        else {
            launchCharactersFragment();
        }

    }

    private boolean setupHomeLayout() {
        setContentView(R.layout.activity_home);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        return true;
    }

    private void launchLoginFragment() {
        setTitle(getString(R.string.title_login));
        Fragment loginFragment = new LoginFragment();
        FragmentManager fm = getFragmentManager();
        fm.beginTransaction().replace(R.id.content_frame, loginFragment).commit();
    }

    private void launchCharactersFragment() {
        setTitle(getString(R.string.title_characters));
        Fragment characterFragment = new CharacterFragment();
        FragmentManager fm = getFragmentManager();
        fm.beginTransaction().replace(R.id.content_frame, characterFragment).commit();
    }

    private void launchCampaignListFragment() {
        mMeteor.subscribe("campaign-list");

        setTitle(getString(R.string.title_campaigns));
        campaignListFragment = new CampaignListFragment();
        FragmentManager fm = getFragmentManager();
        fm.beginTransaction().replace(R.id.content_frame, campaignListFragment).commit();
    }

    private void launchCampaignFragment(Campaign campaign) {
        setTitle(getString(R.string.title_campaign));

        CampaignFragment campaignFragment = new CampaignFragment();
        campaignFragment.setCampaign(campaign);
        FragmentManager fm = getFragmentManager();
        fm.beginTransaction().replace(R.id.content_frame, campaignFragment).commit();
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        } else if (id == R.id.action_logout) {
            mMeteor.logout();
            launchLoginFragment();
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        if (!mMeteor.isLoggedIn()) {
            launchLoginFragment();
        }
        else {
            // Handle navigation view item clicks here.
            int id = item.getItemId();

            if (id == R.id.nav_characters) {
                launchCharactersFragment();
            } else if (id == R.id.nav_campaigns) {
                launchCampaignListFragment();
            } else if (id == R.id.nav_logout) {
                mMeteor.logout();
                launchLoginFragment();
            }
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onConnect(boolean b) {
        Log.d("Meteor.onConnect()", String.valueOf(b));

        if (!b) {
            launchLoginFragment();
        }
    }

    @Override
    public void onDisconnect() {
        Log.d("Meteor.onDisconnect()", "");
    }

    @Override
    public void onException(Exception e) {
        e.printStackTrace();
    }

    @Override
    public void onDataAdded(String collectionName, String documentID, String newValuesJson) {
        switch (collectionName) {
            case "campaigns" :
                try {
                    campaigns.add(new Campaign(documentID, new JSONObject(newValuesJson)));
                    if (campaignListFragment != null) {
                        campaignListFragment.updateCampaigns(campaigns);
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
            default :
                Log.d("collectionName", "the collectionName was unrecognized in onDataAdded: " + collectionName);
        }
        Log.d("JSON", "Collection name is: " + collectionName + ", values are: " + newValuesJson + "doc id " + documentID);
    }

    @Override
    public void onDataChanged(String collectionName, String documentID, String updateJson, String removeJson) {
        Log.d("JSON", "Collection name is: " + collectionName + ", values are: " + updateJson + ", removed values are " + removeJson + "doc id " + documentID);
        switch (collectionName) {
            case "campaigns" :
                try {
                    JSONObject updatedObject = new JSONObject(updateJson);
                    String newName = updatedObject.getString("name");
                    if (newName != null) {
                        for (Campaign c : campaigns) {
                            if (c.getId().equals(documentID)) {
                                Log.d("change", "changing name of " + documentID);
                                c.setName(newName);
                            }
                        }
                        if (campaignListFragment != null) {
                            campaignListFragment.updateCampaigns(campaigns);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            break;
        }
    }

    @Override
    public void onDataRemoved(String s, String s1) {

    }

    @Override
    public void onListFragmentInteraction(DummyContent.DummyItem item) {

    }

    public void onCampaignListFragmentInteraction(Campaign campaign) {
        launchCampaignFragment(campaign);
    }

    public void onCampaignFragmentInteraction(Uri uri) {
    }

    @Override
    public void onSuccessfulLogin(String jsonResult) {
        launchCharactersFragment();
    }

    public List<Campaign> getCampaigns() {
        return campaigns;
    }
}
