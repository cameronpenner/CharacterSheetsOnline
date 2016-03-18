package se2.rpgcompanion;

import org.junit.Test;

import se2.rpgcompanion.Pcharacter;

import static junit.framework.Assert.assertEquals;

/**
 * Created by tygopro on 18/03/16.
 */
public class CharacterTest {
    private Pcharacter testCharacter;
    private Pcharacter testCharTwo;
    private static final String NAME_ONE = "name";
    private static final String NAME_TWO = "Player 2"

    @Test
    public void testSetName(){
        testCharacter = new Pcharacter(NAME_ONE);
        testCharTwo = new Pcharacter(NAME_TWO);

        assertEquals(NAME_ONE, testCharacter.getName());
        assertEquals(NAME_TWO, testCharTwo.getName());
    }
}
