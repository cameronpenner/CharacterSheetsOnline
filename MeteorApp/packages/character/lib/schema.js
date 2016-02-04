Schema = {};
Schema.Character = new SimpleSchema({
    name: {
        type: String
    },
    owner: {
        type: String,
        defaultValue: "public"
    },
    username: {
        type: String,
        defaultValue: "public"
    },
    createdAt: {
        type: Date
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
