const itemSchema = new SimpleSchema({
    name: {
        type: String
    },
    attributes: {
        type: [String], // attibute id's
        optional: true
    }
});

Items = new Mongo.Collection('items');
Items.attachSchema(itemSchema);