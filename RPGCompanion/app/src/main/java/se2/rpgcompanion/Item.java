package se2.rpgcompanion;

/**
 * Created by tygopro on 16/03/16.
 */
public class Item {
    private String itemName;
    private String itemAttribute;

    public Item (String itemName, String itemAttribute) {
        this.itemName = itemName;
        this.itemAttribute = itemAttribute;
    }

    public String getName(){
        return this.itemName;
    }

    public String getItemAttribute(){
        return this.itemAttribute;
    }
}
