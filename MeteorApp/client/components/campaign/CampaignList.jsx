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
        const sub = Meteor.subscribe('campaign-list');
        return {
            ready: sub.ready(),
            campaigns: Campaigns.find().fetch()
        }
    },

    getListItems() {
        return this.data.campaigns.map((campaign) => {
            return <CampaignListItem
                key={campaign._id}
                campaign={campaign}/>;

        });
    },

    render() {
        return (
            <div className="container">
                <h3>Campaigns</h3>
                    {this.data.campaigns.map((campaign) => {
                        return <CampaignGridElement
                            key={campaign._id}
                            campaign={campaign}/>;
                    })}
                    <CampaignGridElement addButton={true}/>
            </div>
        );
    }
});

CampaignGridElement = React.createClass({
    // defines the div that the campaign is held in - serves two purposes:
    // 1. something to pass key to for .map()
    // 2. defines the bootstrap class for the grid

    render() {
        return (
            <div className="col-md-4 text-center" style={{border: '1px solid black'}}>
                {this.props.addButton ? <button className="btn btn-default"><span className="glyphicon glyphicon-plus"/></button> : <CampaignView campaign={this.props.campaign} /> }
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