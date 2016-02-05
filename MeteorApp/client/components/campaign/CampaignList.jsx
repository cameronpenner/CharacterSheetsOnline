var CampaignListItem = React.createClass({
    getPath() {
        return "/campaign/" + this.props.campaign._id
    },
    removeCampaign(event) {
        event.preventDefault();
        Campaign.remove(this.props.campaign);
    },
    getPlayers() {
        return this.data.campaigns.map((player) => {
            return <PlayerListItem
                key={player._id}/>;
        });
    },
    render() {
        return <div>
            <li>
                <a href={this.getPath()}>{this.props.campaign.name}</a>
                <span> moderated by <strong>{this.props.campaign.username}</strong></span>
             <button onClick={this.removeCampaign}>Remove</button>
            </li>
            <ul>
                Proof of Concept
            </ul>
        </div>

        {this.getPlayers()};

    }
});

CampaignList = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        const sub = Meteor.subscribe('campaign-list');
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
            <div>
                <h4>Players in This Campaign</h4>
                <ul>
                    /*{this.data.ready ? this.players : 'loading'}*/
                    Temporary Data!
                </ul>
            </div>
        );
    }
})