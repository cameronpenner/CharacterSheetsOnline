package se2.rpgcompanion;

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import im.delight.android.ddp.Meteor;
import im.delight.android.ddp.MeteorSingleton;
import im.delight.android.ddp.ResultListener;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link se2.rpgcompanion.LoginFragment.OnSuccessfulLoginListener} interface
 * to handle interaction events.
 * Use the {@link LoginFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class LoginFragment extends Fragment {

    // UI references.
    private EditText mUsernameView;
    private EditText mPasswordView;

    private OnSuccessfulLoginListener mListener;
    private ResultListener loginResultListener;

    private Meteor mMeteor;

    public LoginFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @return A new instance of fragment LoginFragment.
     */
    public static LoginFragment newInstance() {
        return new LoginFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loginResultListener = new ResultListener() {
            @Override
            public void onSuccess(String s) {
                mListener.onSuccessfulLogin(s);
            }

            @Override
            public void onError(String s, String s1, String s2) {
                Log.e("loginResultListener", s + " " + s1 + " " + s2);
                mUsernameView.setError(s1);
            }
        };

        mMeteor = MeteorSingleton.getInstance();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final View loginFragmentView = inflater.inflate(R.layout.fragment_login, container, false);

        mUsernameView = (EditText) loginFragmentView.findViewById(R.id.username);
        mPasswordView = (EditText) loginFragmentView.findViewById(R.id.password);

        // Reset errors.
        mUsernameView.setError(null);
        mPasswordView.setError(null);

        mPasswordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == R.id.login || id == EditorInfo.IME_NULL) {
                    // Store values at the time of the login attempt.
                    String username = mUsernameView.getText().toString();
                    String password = mPasswordView.getText().toString();

                    return true;
                }
                return false;
            }
        });

        Button mUsernameSignInButton = (Button) loginFragmentView.findViewById(R.id.username_sign_in_button);
        mUsernameSignInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = mUsernameView.getText().toString();
                String password = mPasswordView.getText().toString();
                mMeteor.loginWithUsername(username, password, loginResultListener);
            }
        });

        Button mUsernameRegisterButton = (Button) loginFragmentView.findViewById(R.id.username_register_button);
        mUsernameRegisterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = mUsernameView.getText().toString();
                String password = mPasswordView.getText().toString();
                mMeteor.registerAndLogin(username, null, password, loginResultListener);
            }
        });

        return loginFragmentView;
    }



    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnSuccessfulLoginListener) {
            mListener = (OnSuccessfulLoginListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement LoginListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnSuccessfulLoginListener {
        void onSuccessfulLogin(String jsonResult);
    }
}
