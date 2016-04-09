const characterSchema = new SimpleSchema({
    name: {
        type: String
    },
    owner: {
        type: String,
        defaultValue: "public"
    },
    owner_name: {
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
    items: {
        type: [String], //item id's
        optional: true
    },
    attributes: {
        type: [String], //attribute id's
        optional: true
    },
    img_path: {
        type: String,
        defaultValue: "/images/Default.png"
    },
        img_url: {
        type: String,
        defaultValue: null,
        optional: true
    }
});

Characters = new Mongo.Collection('characters');
Characters.attachSchema(characterSchema);