var CampaignListItem = React.createClass({
    getPath() {
        return "/campaign/" + this.props.campaign._id
    },
    removeCampaign(event) {
        event.preventDefault();
        Campaign.remove(this.props.campaign);
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
        const sub = Meteor.subscribe('campaign-list', Meteor.userId(), "dennantest@test.com");
        return {
            ready: sub.ready(),
            campaigns: Campaign.findAll()
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
            <div>
                <h3>Campaigns List</h3>
                <ul>
                    {this.data.ready ? this.getListItems() : 'loading'}
                </ul>
            </div>
        );
    }
});

CampaignPlayer = React.createClass({

    render() {
        return (
            <li>
                {this.props.player}
            </li>
        );
    }
})