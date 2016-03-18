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
                <h3 className="text-center">Campaigns</h3>
                <div className="panel panel-default">
                    <div className="panel-body text-center">
                        <button className="btn btn-default" onClick={this.createCampaign}><span className="glyphicon glyphicon-plus"/></button>
                    </div>
                </div>
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