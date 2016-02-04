Collections = {};
Collections.Campaigns = new Mongo.Collection('campaigns');
Collections.Campaigns.attachSchema(Schema.Campaigns);