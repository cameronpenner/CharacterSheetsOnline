CampaignEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {edit: false};
    },

    setCampaign(campaign) {
        this.data.campaign = campaign;
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
        var data = {currentUser: Meteor.userId(), currentUsername: Meteor.user().username};
        var setCampaign = this.setCampaign;
        var setCampaignList = this.setCampaignList;
        var self = this;

        if (_id) {
            Meteor.subscribe("campaign", _id, {
                onReady: function() {
                    setCampaign(Campaigns.findOne(_id));
                    self.setState({edit: true});
                }
            });
        }

        data.campaigns = Campaigns.find().fetch();

        return data;
    },

    handleDataSubmit(event) {
        event.preventDefault();
        var campaign = {name : this.refs.campaignName.value.trim()}
        var shouldRedirect = !this.data.campaign;
        if (this.data.campaign) {
            campaign = this.data.campaign;
        } else {
            campaign = {};
            campaign.players = [];
            campaign.characters = [];
            campaign.game_master = this.data.currentUser;
            campaign.game_master_name = this.data.currentUsername;
        }
       
        campaign.name = this.refs.campaignName.value.trim();
 
        var self = this;
        Meteor.call("upsertCampaign", campaign, function(id) {
            if (shouldRedirect) {
                self.data.campaign = campaign;
                self.data.campaign._id = id;
                self.setState({edit: true});
            }
        });
    },
    
    getOperationName() {
        if (this.state.edit) {
            return "Edit Campaign";
        }
        return "Create Campaign";
    },

    render() {
        return (
            <div>
                <div>
                <h3>{this.getOperationName()}</h3>
                <form className="new-campaign" onSubmit={this.handleDataSubmit}>
                    <field>
                        <label>Name</label>
                        <input type="text" ref="campaignName" name="campaignName"/>
                    </field>
                    <button type="submit">Save</button>
                </form>
                </div>
                {this.state.edit ?
                    <div>
                        <AddPlayers campaign={this.data.campaign}/>
                    </div>
                : ''
                }
            </div>
        );
    }
});