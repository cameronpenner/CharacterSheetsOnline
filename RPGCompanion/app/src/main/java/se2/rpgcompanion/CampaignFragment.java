package se2.rpgcompanion;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
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
 * {@link CampaignFragment.OnCampaignFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link CampaignFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class CampaignFragment extends Fragment {

    private Campaign campaign;
    private List<String> characterNames;

    private ArrayAdapter<String> characterAdapter;

    private OnCampaignFragmentInteractionListener mListener;

    public CampaignFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @return A new instance of fragment CampaignFragment.
     */
    public static CampaignFragment newInstance(String param1, String param2) {
        CampaignFragment fragment = new CampaignFragment();
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
        View view = inflater.inflate(R.layout.fragment_campaign_view, container, false);
        ((TextView) view.findViewById(R.id.nameTextView)).setText(campaign.getName());
        ((TextView) view.findViewById(R.id.gameMasterTextView)).setText(campaign.getGameMasterName());

        ListView characterNamesListView = (ListView) view.findViewById(R.id.characterListView);
        characterNamesListView.setAdapter(characterAdapter);


        ListView playerNamesListView = (ListView) view.findViewById(R.id.playerListView);
        ArrayAdapter<String> playerAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, campaign.getPlayers());
        playerNamesListView.setAdapter(playerAdapter);

        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onCampaignFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnCampaignFragmentInteractionListener) {
            mListener = (OnCampaignFragmentInteractionListener) context;
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

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnCampaignFragmentInteractionListener {
        // TODO: Update argument type and name
        void onCampaignFragmentInteraction(Uri uri);
    }
}
