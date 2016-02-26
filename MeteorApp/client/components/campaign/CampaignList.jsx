var CampaignListItem = React.createClass({
    getPath() {
        return "/campaign/" + this.props.campaign._id
    },
    removeCampaign(event) {
        event.preventDefault();
        Meteor.call("removeCampaign", this.props.campaign);
    },
    getPlayers() {
        return this.props.campaign.players.map((player) => {
            return <CampaignPlayer
                key={player}
                player={player}/>;
        });
    },
    render() {
        return <div>
            <li>
                <a href={this.getPath()}>{this.props.campaign.name}</a>
                <span> moderated by <strong>{this.props.campaign.game_master_name}</strong></span>
             <button onClick={this.removeCampaign}>Remove</button>
            </li>
            <ul>
                {this.getPlayers()}
            </ul>
        </div>;

    }
});

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
            <div>
                <h3>Campaigns</h3>
                    {this.data.campaigns.map((campaign) => {
                        return <CampaignGridElement
                            key={campaign._id}
                            campaign={campaign}
                            characters={self.data.characters}/>;
                    })}
                    <CampaignGridElement addButton={true} createCampaign={this.createCampaign}/>
            </div>
        );
    },

    createCampaign() {
        var campaign = {};
        campaign.name = "new campaign";
        campaign.players = [];
        campaign.characters = [];
        campaign.game_master = this.data.currentUser;
        campaign.game_master_name = this.data.currentUsername;

        Meteor.call("upsertCampaign", campaign);

    }
});

CampaignGridElement = React.createClass({
    // defines the div that the campaign is held in - serves two purposes:
    // 1. something to pass key to for .map()
    // 2. defines the bootstrap class for the grid

    render() {
        return (
            <div className="row" style={{border: '1px solid black'}}>
                {this.props.addButton ? <button className="btn btn-default" onClick={this.props.createCampaign}><span className="glyphicon glyphicon-plus"/></button> : <CampaignView campaign={this.props.campaign} characters={this.props.characters}/> }
            </div>
        );
    }
    
})

CampaignPlayer = React.createClass({

    render() {
        return (
            <li>
                {this.props.player}
            </li>
        );
    }
})