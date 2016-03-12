package se2.rpgcompanion;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import android.content.Context;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import im.delight.android.ddp.Meteor;
import im.delight.android.ddp.MeteorSingleton;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.closeSoftKeyboard;
import static android.support.test.espresso.action.ViewActions.typeText;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;

@RunWith(AndroidJUnit4.class)
public class LoginActivityTest {

    private Meteor mMeteor;
    private String mStringToBetyped;

    @Rule
    public ActivityTestRule<LoginActivity> mLoginActivityRule = new ActivityTestRule<>(
            LoginActivity.class);

    @Before
    public void init() {
        mStringToBetyped = "Espresso";
    }

    @Test
     public void changeUsernameText() {
        // Type text and then press the button.
        onView(withId(R.id.username))
                .perform(typeText(mStringToBetyped), closeSoftKeyboard());

        // Check that the text was changed.
        onView(withId(R.id.username))
                .check(matches(withText(mStringToBetyped)));
    }

    @Test
    public void changePasswordText() {
        // Type text and then press the button.
        onView(withId(R.id.password))
                .perform(typeText(mStringToBetyped), closeSoftKeyboard());

        // Check that the text was changed.
        onView(withId(R.id.password))
                .check(matches(withText(mStringToBetyped)));
    }
}