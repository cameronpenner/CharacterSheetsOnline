CampaignList = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        const campaignSub = Meteor.subscribe('campaign-list');
        const characterSub = Meteor.subscribe('character-list');

        return {
            ready: campaignSub.ready() && characterSub.ready(),
            campaigns: Campaigns.find().fetch(),
            characters: Characters.find().fetch()
        }
    },

    render() {
        var self = this;
        return (
            <Fader>
                <h1 className="text-center">Campaigns</h1>
                &emsp;
                <div>
                    <button className="btn btn-block btn-primary" onClick={this.createCampaign}>New Campaign</button>
                </div>
                &emsp;
                {this.data.campaigns.map((campaign) => {
                    return <CampaignView
                        key={campaign._id}
                        campaign={campaign}
                        characters={self.data.characters}
                        onDelete={self.deleteCampaign} />;
                })}
            </Fader>
        );
    },

    createCampaign() {
        var campaign = {};
        campaign.name = "New Campaign";
        campaign.players = [];
        campaign.character_ids = [];
        campaign.game_master_name = this.data.currentUsername;

        Meteor.call("upsertCampaign", campaign);

    },

    deleteCampaign(campaign) {
        Meteor.call("removeCampaign", campaign);
    }
});