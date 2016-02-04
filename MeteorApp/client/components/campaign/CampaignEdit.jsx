CampaignEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {};
    },


    getMeteorData() {
        var _id = this.props.routeParams._id;
        var data = {currentUser: Meteor.userId()};

        if (_id) {
            Meteor.subscribe("campaign", _id, {
                onReady: function() {
                    console.log("campaign ready with " + _id);
                }
            });
        }
        return data;
    },

    handleDataSubmit(event) {
        event.preventDefault();
        Campaign.upsert();
    },

    handlePlayerSubmit(event) {
        event.preventDefaults();
        Campaign.addPlayer();
    },

    render() {
        return (
            <div>
                <h3>Edit Campaign</h3>
                <form className="new-campaign" onSubmit={this.handleDataSubmit}>
                    <field>
                        <label>Name</label>
                        <input type="text" ref="name" name="name"/>
                    </field>
                    <button type="submit">Save</button>
                </form>
                <form className="add-player" onSubmit={this.handlePlayerSubmit}>
                    <field>
                        <label>Player email</label>
                        <input type="text" ref="name" name="name"/>
                    </field>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
});

