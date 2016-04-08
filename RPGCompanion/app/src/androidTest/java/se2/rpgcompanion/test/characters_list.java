package se2.rpgcompanion.test;

import se2.rpgcompanion.HomeActivity;
import com.robotium.solo.*;
import android.test.ActivityInstrumentationTestCase2;


public class characters_list extends ActivityInstrumentationTestCase2<HomeActivity> {
  	private Solo solo;
  	
  	public characters_list() {
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
        //Sleep for 2862 milliseconds
		solo.sleep(2862);
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username));
        //Sleep for 1528 milliseconds
		solo.sleep(1528);
        //Enter the text: 'jeff'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.username), "jeff");
        //Click on Empty Text View
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.password));
        //Sleep for 755 milliseconds
		solo.sleep(755);
        //Enter the text: 'jeff'
		solo.clearEditText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password));
		solo.enterText((android.widget.EditText) solo.getView(se2.rpgcompanion.R.id.password), "jeff");
        //Sleep for 604 milliseconds
		solo.sleep(604);
        //Click on Sign In
		solo.clickOnView(solo.getView(se2.rpgcompanion.R.id.username_sign_in_button));
        //Sleep for 2002 milliseconds
		solo.sleep(2002);
        //Click on ImageView
		solo.clickOnView(solo.getView(android.widget.ImageButton.class, 0));
        //Sleep for 4678 milliseconds
		solo.sleep(4678);
        //Click on Characters FrameLayout
		solo.clickInRecyclerView(1, 0);
        //Sleep for 2549 milliseconds
		solo.sleep(2549);
        //Click on ImageView
		solo.clickOnView(solo.getView(android.widget.ImageButton.class, 0));
        //Sleep for 9084 milliseconds
		solo.sleep(9084);
        //Click on 1 Item 1
		solo.clickInRecyclerView(0, 0);
	}
}
