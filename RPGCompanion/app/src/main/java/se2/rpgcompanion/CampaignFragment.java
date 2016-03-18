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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_campaign_view, container, false);
        ((TextView) view.findViewById(R.id.nameTextView)).setText(campaign.getName());
        ((TextView) view.findViewById(R.id.gameMasterTextView)).setText(campaign.getGameMasterName());

        ListView characterNamesListView = (ListView) view.findViewById(R.id.characterListView);
        ArrayAdapter<String> characterAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, campaign.getCharacterIds());
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
