package se2.rpgcompanion.test;

import se2.rpgcompanion.HomeActivity;
import com.robotium.solo.*;
import android.test.ActivityInstrumentationTestCase2;


public class login_fail extends ActivityInstrumentationTestCase2<HomeActivity> {
  	private Solo solo;
  	
  	public login_fail() {
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
        //Sleep for 4840 milliseconds
		solo.sleep(4840);
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username));
        //Sleep for 1833 milliseconds
		solo.sleep(1833);
        //Enter the text: 'hi'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username), "hi");
        //Sleep for 1349 milliseconds
		solo.sleep(1349);
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.password));
        //Sleep for 2077 milliseconds
		solo.sleep(2077);
        //Enter the text: '12345'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password), "12345");
        //Sleep for 1488 milliseconds
		solo.sleep(1488);
        //Click on Sign In
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username_sign_in_button));
        //Sleep for 3583 milliseconds
		solo.sleep(3583);
        //Click on hi
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username));
        //Sleep for 2636 milliseconds
		solo.sleep(2636);
        //Assert that: 'User not found' is shown
		assertTrue("'User not found' is not shown!", solo.waitForText(java.util.regex.Pattern.quote("User not found"), 1, 20000, true, true));
        //Sleep for 743 milliseconds
		solo.sleep(743);
        //Assert that: 'User not found' is shown
		assertTrue("'User not found' is not shown!", solo.waitForText(java.util.regex.Pattern.quote("User not found"), 1, 20000, true, true));
	}
}
