CampaignEdit = React.createClass({
    mixins:[ReactMeteorData, ReactRouter.Router.Navigation],

    getInitialState() {
        return {};
    },

    setCampaign(campaign) {
        this.data.campaign = campaign;
    },

    setCampaignList(list) {
        console.log(list);
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
        var data = {currentUser: Meteor.userId()};
        var setCampaign = this.setCampaign;
        var setCampaignList = this.setCampaignList;

        if (_id) {
            Meteor.subscribe("campaign", _id, {
                onReady: function() {
                    setCampaign(Campaign.find(_id));
                }
            });
        }

        data.campaigns = Campaign.findAll();

        return data;
    },

    handleDataSubmit(event) {
        event.preventDefault();
        var campaign = {name : this.refs.campaignName.value.trim()}
        var shouldRedirect = !this.data.campaign;
        if (this.data.campaign) {
            campaign.players = this.data.campaign.players;
            campaign.characters = this.data.campaign.characters;
        } else {
            campaign.players = [];
            campaign.characters = [];
            campaign.game_master = this.data.currentUser;
        }
        var history = this.history;
        (Campaign.upsert(campaign, function(id) {
            if (shouldRedirect) {
                this.history.pushState(null, "/campaign/" + id);
            }
        }));
    },

    handlePlayerSubmit(event) {
        event.preventDefault();
        Campaign.addPlayer();
    },

    renderPlayers() {
    },

    getOperationName() {
        if (this.data.campaign == null) {
            return "Create Campaign";
        }
        return "Edit Campaign";
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
                {this.data.campaign ?
                <div>
                <h3>Add Players</h3>
                <form className="add-player" onSubmit={this.handlePlayerSubmit}>
                    <field>
                        <label>Player email</label>
                        <input type="text" ref="playerName" name="playerName"/>
                    </field>
                    <button type="submit">Add</button>
                    <ul>
                        {this.renderPlayers()}
                    </ul>
                </form>
                </div>
                : ''
                }
            </div>
        );
    }
});