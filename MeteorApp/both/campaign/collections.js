const campaignSchema = new SimpleSchema({
    name: {
        type: String
    },
    game_master: {
        type: String
    },
    game_master_name: {
        type: String
    },
    players: {
        type: [String]
    },
    character_ids: {
        type: [String]
    }
});

Campaigns = new Mongo.Collection('campaigns');
Campaigns.attachSchema(campaignSchema);