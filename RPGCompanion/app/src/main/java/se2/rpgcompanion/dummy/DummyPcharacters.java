package se2.rpgcompanion.dummy;

import java.util.ArrayList;
import java.util.List;

import se2.rpgcompanion.Pcharacter;

/**
 * Created by tygopro on 16/03/16.
 */
public class DummyPcharacters {

    public static final List<Pcharacter> CHARS = new ArrayList<>();

    static {
        // Add some sample items.
        Pcharacter playerOne = new Pcharacter ("Player One");
        Pcharacter playerTwo = new Pcharacter ("Player Two");
        Pcharacter playerThree = new Pcharacter ("Player Three");
        Pcharacter playerFour = new Pcharacter ("Player Four");
        Pcharacter playerFive = new Pcharacter ("Player Five");
        Pcharacter playerSix = new Pcharacter ("Player Six");
        Pcharacter playerSeven = new Pcharacter ("Player Seven");
        Pcharacter playerEight = new Pcharacter ("Player Eight");
        Pcharacter playerNine = new Pcharacter ("Player Nine");
        Pcharacter playerTen = new Pcharacter ("Player Ten");

        CHARS.add(playerOne);
        CHARS.add(playerTwo);
        CHARS.add(playerThree);
        CHARS.add(playerFour);
        CHARS.add(playerFive);
        CHARS.add(playerSix);
        CHARS.add(playerSeven);
        CHARS.add(playerEight);
        CHARS.add(playerNine);
        CHARS.add(playerTen);
    }
}
