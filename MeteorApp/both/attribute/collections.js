const attributeSchema = new SimpleSchema({
    name: {
        type: String
    },
    value: {
        type: String,
        optional: true
    }
});

Attributes = new Mongo.Collection('attributes');
Attributes.attachSchema(attributeSchema);