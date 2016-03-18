package se2.rpgcompanion;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Campaign {
    private String id;
    private String name;
    private String gameMaster;
    private String gameMasterName;

    private List<String> players;
    private List<String> characterIds;

    public Campaign(String id, JSONObject object) throws JSONException {
        this.id = id;
        this.name = object.getString("name");
        this.gameMaster = object.getString("game_master");
        this.gameMasterName = object.getString("game_master_name");

        JSONArray playerJSONArray = object.getJSONArray("players");
        this.players = new ArrayList<String>();
        for (int i = 0; i < playerJSONArray.length(); i++) {
            this.players.add(playerJSONArray.getString(i));
        }

        JSONArray characterIdJSONArray = object.getJSONArray("character_ids");
        this.characterIds = new ArrayList<String>();
        for (int i = 0; i < characterIdJSONArray.length(); i++) {
            this.characterIds.add(characterIdJSONArray.getString(i));
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGameMaster() {
        return gameMaster;
    }

    public void setGameMaster(String gameMaster) {
        this.gameMaster = gameMaster;
    }

    public String getGameMasterName() {
        return gameMasterName;
    }

    public void setGameMasterName(String gameMasterName) {
        this.gameMasterName = gameMasterName;
    }

    public List<String> getPlayers() {
        return players;
    }

    public void setPlayers(List<String> players) {
        this.players = players;
    }

    public List<String> getCharacterIds() {
        return characterIds;
    }

    public void setCharacterIds(List<String> characterIds) {
        this.characterIds = characterIds;
    }
}
