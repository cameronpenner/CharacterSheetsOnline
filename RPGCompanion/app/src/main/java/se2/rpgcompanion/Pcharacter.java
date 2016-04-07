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
    private String id;

    public Pcharacter (String name,
                      String owner,
                      String ownerName,
                      String creationDate,
                      String campaign,
                      ArrayList<Item> items,
                      ArrayList<String> attributes,
                      String id){
        this.name = name;
        this.owner = owner;
        this.ownerName = ownerName;
        this.creationDate = creationDate;
        this.campaign = campaign;
        this.items = items;
        this.attributes = attributes;
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String newName){
        this.name = newName;
    }

    public String getOwner(){
        return this.owner;
    }

    public void setOwner(String newOwner){
        this.owner = newOwner;
    }

    public String getOwnerName(){
        return this.ownerName;
    }

    public void setOwnerName(String newOwnerName){
        this.ownerName = newOwnerName;
    }

    public String getCreationDate(){
        return this.creationDate;
    }

    public void setCreationDate(String newCreationDate){
        this.creationDate = newCreationDate;
    }

    public String getCampaign(){
        return this.campaign;
    }

    public void setCampaign(String newCampaign){
        this.campaign = newCampaign;
    }

    public ArrayList<Item> getItems(){
        return this.items;
    }

    public void setItems(ArrayList<Item> newItems){
        this.items = newItems;
    }

    public ArrayList<String> getAttributes(){
        return this.attributes;
    }

    public void setAttributes(ArrayList<String> newAttributes){
        this.attributes = newAttributes;
    }

    public String getId(){
        return this.id;
    }

    @Override
    public String toString() {
        return this.getName();
    }
}
