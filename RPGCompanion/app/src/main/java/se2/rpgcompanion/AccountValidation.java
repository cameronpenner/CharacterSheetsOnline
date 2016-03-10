package se2.rpgcompanion;

/**
 * Created by Jeff on 3/10/2016.
 */
public class AccountValidation {
    public static boolean isValidUsername(String username) {
        return username.length() > 0;
    }

    public static boolean isValidPassword(String password) {
        return password.length() > 0;
    }
}
