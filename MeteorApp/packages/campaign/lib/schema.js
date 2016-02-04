Schema = {};
Schema.Campaign = new SimpleSchema({
    name: {
        type: String
    },
    game_master: {
        type: String
    }, 
    players: {
        type: [String]
    },
    characters: {
        type: [String]
    }
});