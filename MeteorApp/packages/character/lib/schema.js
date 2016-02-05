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
        optional: true
    },
    inventory: {
        type: [Schema.Inventory],
        optional: true,
    }
});

Schema.Inventory = new SimpleSchema({
    items: {
        type: [Schema.Item]
    }    
});

Schema.Item = new SimpleSchema({
    name: {
        type: String
    },
    parameters: {
        type: [Schema.ItemParameter],
        defaultValue: "public"
    },  
});

Schema.ItemParameter = new SimpleSchema({
    name: {
        type: String
    },
    value: {
        type: String
    }
});