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

    handleSubmit(event) {
        event.preventDefault();
        console.log("hehehe it worked");
    },

    render() {
        return (
            <div>
                <h3>Edit Campaign</h3>
                <form className="new-campaign" onSubmit={this.handleSubmit}>
                    <field>
                        <label>Name</label>
                        <input type="text" ref="name" name="name"/>
                    </field>
                    <button type="submit">Save</button>
                </form>

            </div>
        );
    }
});

