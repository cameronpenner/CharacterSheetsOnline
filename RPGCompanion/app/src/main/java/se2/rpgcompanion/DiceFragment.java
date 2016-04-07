package se2.rpgcompanion;

import android.content.Context;
import android.os.Bundle;
import android.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import java.util.Random;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * to handle interaction events.
 */
public class DiceFragment extends Fragment {

    //private OnDiceFragmentInteractionListener mListener;

    public DiceFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        final View view = inflater.inflate(R.layout.fragment_dice, container, false);

        final Button button = (Button)view.findViewById(R.id.button);
        final RadioGroup rbg = (RadioGroup)view.findViewById(R.id.radiogroup);
        final TextView diceDisplay = (TextView)view.findViewById(R.id.textView3);

        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                int selected = rbg.getCheckedRadioButtonId();
                int maxDiceNum = 0;

                switch (selected) {
                    case R.id.radioButton4 :
                        maxDiceNum = 4;
                        break;
                    case R.id.radioButton6 :
                        maxDiceNum = 6;
                        break;
                    case R.id.radioButton8 :
                        maxDiceNum = 8;
                        break;
                    case R.id.radioButton10 :
                        maxDiceNum = 10;
                        break;
                    case R.id.radioButton12 :
                        maxDiceNum = 12;
                        break;
                    case R.id.radioButton20 :
                        maxDiceNum = 20;
                        break;
                    default :
                        Log.d("Fail dice", "Dice roll failure.");
                }

                Log.d("click", "button " + selected + " was clicked");
                Log.d("click", "Dice number " + maxDiceNum + " was selected");

                Random rand = new Random();
                int diceRoll = rand.nextInt(maxDiceNum) + 1;

                Log.d("click", "Dice roll was: " + diceRoll);

                diceDisplay.setText(Integer.toString(diceRoll));

            }
        });

        return view;
    }

    // TODO: This fragment needs some buttons or something.

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
/*
        if (context instanceof OnDiceFragmentInteractionListener) {
            mListener = (OnDiceFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }*/
    }

    @Override
    public void onDetach() {
        super.onDetach();
        //mListener = null;
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
/*
    public interface OnDiceFragmentInteractionListener {
        // TODO: Update argument type and name
        void onDiceFragmentInteraction();
    }*/
}
