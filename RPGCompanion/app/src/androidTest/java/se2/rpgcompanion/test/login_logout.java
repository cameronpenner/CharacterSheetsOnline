package se2.rpgcompanion.test;

import se2.rpgcompanion.HomeActivity;
import com.robotium.solo.*;
import android.test.ActivityInstrumentationTestCase2;


public class login_logout extends ActivityInstrumentationTestCase2<HomeActivity> {
  	private Solo solo;
  	
  	public login_logout() {
		super(HomeActivity.class);
  	}

  	public void setUp() throws Exception {
        super.setUp();
		solo = new Solo(getInstrumentation());
		getActivity();
  	}
  
   	@Override
   	public void tearDown() throws Exception {
        solo.finishOpenedActivities();
        super.tearDown();
  	}
  
	public void testRun() {
        //Wait for activity: 'se2.rpgcompanion.HomeActivity'
		solo.waitForActivity(se2.rpgcompanion.HomeActivity.class, 2000);
        //Sleep for 2521 milliseconds
		solo.sleep(2521);
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username));
        //Sleep for 1724 milliseconds
		solo.sleep(1724);
        //Enter the text: 'test123'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username), "test123");
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.password));
        //Sleep for 1103 milliseconds
		solo.sleep(1103);
        //Enter the text: 'test'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password), "test");
        //Sleep for 618 milliseconds
		solo.sleep(618);
        //Click on Sign In
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username_sign_in_button));
        //Sleep for 2867 milliseconds
		solo.sleep(2867);
        //Click on ImageView
		solo.clickOnView(solo.getView(android.widget.ImageButton.class, 0));
        //Sleep for 1502 milliseconds
		solo.sleep(1502);
        //Click on Campaigns FrameLayout
		solo.clickInRecyclerView(5, 0);
	}
}
