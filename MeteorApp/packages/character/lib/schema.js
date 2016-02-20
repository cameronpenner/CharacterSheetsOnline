Schema = {};
SimpleSchema.debug = true;
Schema.Character = new SimpleSchema({
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
    attributes: {
        type: [Object],
        optional: true
    },
    inventory: {
        type: [Object],
        optional: true
    },
    'inventory.$.name': {
        type: String
    },
    'inventory.$.parameters': {
        type: [Object],
        optional: true
    },
    'inventory.$.parameters.$.name': {
        type: String
    },
    'inventory.$.parameters.$.value': {
        type: String
    },
    attributeList: {
        type: [String],
        optional: true,
    }
});
