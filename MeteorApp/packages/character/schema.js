Schema = {};
Schema.Character = new SimpleSchema({
    name: {
        type: String
    },
    owner: {
        type: String
    },
    campaign: {
        type: String,
        optional: true
    },
    attributes: {
        type: [Object],
        optional: true,
    }
});
