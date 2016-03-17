package se2.rpgcompanion;

import java.util.ArrayList;

/**
 * Created by tygopro on 16/03/16.
 */
public class Pcharacter {

    private String name;
    private String owner;
    private String ownerName;
    private String creationDate;
    private String campaign;
    private ArrayList<Item> items;
    private ArrayList<String> attributes;

    public Pcharacter (String name)/*,
                      String owner,
                      String ownerName,
                      String creationDate,
                      String campaign,
                      ArrayList<Item> items,
                      ArrayList<String> attributes)*/{
        this.name = name; /*
        this.owner = owner;
        this.ownerName = ownerName;
        this.creationDate = creationDate;
        this.campaign = campaign;
        this.items = items;
        this.attributes = attributes; */
    }

    public String getName(){
        return this.name;
    }
    /*
    public String getOwner(){
        return this.owner;
    }

    public String getOwnerName(){
        return this.ownerName;
    }

    public String getCreationDate(){
        return this.creationDate;
    }

    public String getCampaign(){
        return this.campaign;
    }

    public ArrayList<Item> getItems(){
        return this.items;
    }

    public ArrayList<String> getAttributes(){
        return this.attributes;
    }
    */
    @Override
    public String toString() {
        return this.getName();
    }
}
