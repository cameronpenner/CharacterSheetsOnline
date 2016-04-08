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
    private static final String OWNER_ONE = "owner";
    private static final String OWNER_NAME_ONE = "owner_name";
    private static final String CREATION_DATE_ONE = "creation_date";
    private static final String CAMPAIGN_ONE = "campaign";
    private static final String ID_ONE = "id";

    private static final String NAME_TWO = "Player 2";
    private static final String OWNER_TWO = "Player";
    private static final String OWNER_NAME_TWO = "SomeDude";
    private static final String CREATION_DATE_TWO = "tomorrow";
    private static final String CAMPAIGN_TWO = "epic campaign of epic";
    private static final String ID_TWO = "9001";

    @Test
    public void testSetName(){
        testCharacter = new Pcharacter(NAME_ONE, OWNER_ONE, OWNER_NAME_ONE, CREATION_DATE_ONE, CAMPAIGN_ONE, null, null, ID_ONE);
        testCharTwo = new Pcharacter(NAME_TWO, OWNER_TWO, OWNER_NAME_TWO, CREATION_DATE_TWO, CAMPAIGN_TWO, null, null, ID_TWO);

        assertEquals(NAME_ONE, testCharacter.getName());
        assertEquals(OWNER_ONE, testCharacter.getOwner());
        assertEquals(OWNER_NAME_ONE, testCharacter.getOwnerName());
        assertEquals(CREATION_DATE_ONE, testCharacter.getCreationDate());
        assertEquals(CAMPAIGN_ONE, testCharacter.getCampaign());
        assertEquals(ID_ONE, testCharacter.getId());

        assertEquals(NAME_TWO, testCharTwo.getName());
        assertEquals(OWNER_TWO, testCharTwo.getOwner());
        assertEquals(OWNER_NAME_TWO, testCharTwo.getOwnerName());
        assertEquals(CREATION_DATE_TWO, testCharTwo.getCreationDate());
        assertEquals(CAMPAIGN_TWO, testCharTwo.getCampaign());
        assertEquals(ID_TWO, testCharTwo.getId());

        testCharacter.setName(NAME_TWO);
        testCharacter.setOwner(OWNER_TWO);
        testCharacter.setOwnerName(OWNER_NAME_TWO);
        testCharacter.setCampaign(CAMPAIGN_TWO);

        assertEquals(NAME_TWO, testCharacter.getName());
        assertEquals(OWNER_TWO, testCharacter.getOwner());
        assertEquals(OWNER_NAME_TWO, testCharacter.getOwnerName());
        assertEquals(CAMPAIGN_TWO, testCharacter.getCampaign());
        assertEquals(ID_ONE, testCharacter.getId());

    }
}
