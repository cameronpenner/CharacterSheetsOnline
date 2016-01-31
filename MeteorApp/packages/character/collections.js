Collections = {};
Collections.Character = new Mongo.Collection('characters');
Collections.Character.attachSchema(Schema.Character);