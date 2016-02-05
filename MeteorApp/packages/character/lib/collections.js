Collections = {};

Collections.Characters = new Mongo.Collection('characters');
Collections.Characters.attachSchema(Schema.Character);