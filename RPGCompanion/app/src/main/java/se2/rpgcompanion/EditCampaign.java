package se2.rpgcompanion;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import im.delight.android.ddp.MeteorSingleton;
import im.delight.android.ddp.ResultListener;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link EditCampaign.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link EditCampaign#newInstance} factory method to
 * create an instance of this fragment.
 */
public class EditCampaign extends Fragment {
    private OnFragmentInteractionListener mListener;

    private Campaign campaign;
    private List<String> characterNames;

    private ArrayAdapter<String> characterAdapter;

    public EditCampaign() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment EditCampaign.
     */
    // TODO: Rename and change types and number of parameters
    public static EditCampaign newInstance(String param1, String param2) {
        EditCampaign fragment = new EditCampaign();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ResultListener characterResultListener = new ResultListener() {

            @Override
            public void onSuccess(String s) {
                Log.d("charactername", s);
                //@TODO: replace this with Character construtor once it exists
                String name = "";
                try {
                    name = new JSONObject(s).getString("name");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                characterNames.add(name);
                characterAdapter.notifyDataSetChanged();
            }

            @Override
            public void onError(String s, String s1, String s2) {
                Log.e("characterResultListener", s + " " + s1 + " " + s2);
            }
        };

        characterNames = new ArrayList<String>();
        characterAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, characterNames);
        for (int i = 0; i < campaign.getCharacterIds().size(); i++) {
            String[] params = {campaign.getCharacterIds().get(i)};
            MeteorSingleton.getInstance().call("getCharacter", params, characterResultListener);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_edit_campaign, container, false);

        if (campaign != null) {
            ((EditText) view.findViewById(R.id.campaign_name_edittext)).setText(campaign.getName());

            ListView characterNamesListView = (ListView) view.findViewById(R.id.characters_list);
            characterNamesListView.setAdapter(characterAdapter);
        }

        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Campaign getCampaign() {return this.campaign;}

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
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
