package se2.rpgcompanion;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.*;
import static org.mockito.Mockito.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * To work on unit tests, switch the Test Artifact in the Build Variants view.
 */
@RunWith(MockitoJUnitRunner.class)
public class AccountValidationUnitTest {

    private static final String GOOD_USERNAME = "goodusername";
    private static final String BAD_USERNAME = "";
    private static final String GOOD_PASSWORD = "goodpassword";
    private static final String BAD_PASSWORD = "";

    @Mock
    Context mMockContext;

    @Test
     public void test_isValidUsername() {
        assertThat(AccountValidation.isValidUsername(GOOD_USERNAME), is(true));
        assertThat(AccountValidation.isValidUsername(BAD_USERNAME), is(false));
    }

    @Test
    public void test_isValidPassword() {
        assertThat(AccountValidation.isValidPassword(GOOD_PASSWORD), is(true));
        assertThat(AccountValidation.isValidPassword(BAD_PASSWORD), is(false));
    }
}