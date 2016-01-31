Character = {}

Character.edit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {}
    },

    getMeteorData() {
        return {
            currentUser: Meteor.userId()
        }
    },

    handleSubmit(event) {
        event.preventDefault()

        if (this.data.currentUser) {
            var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
            Meteor.call("insertCharacter", {
                name: name,
                owner: this.data.currentUser
            });

            this.props.history.pushState("/");
        }
    },

    render() {

        return (
            <div>
                <h3>Edit Character</h3>
                <form className="new-character" onSubmit={this.handleSubmit}>
                    <field>
                        <label>Name</label>
                        <input type="text" ref="name" name="name" />
                    </field>
                    {this.data.currentUser ? <button action="submit">Save</button> : ''}
                </form>

            </div>
        );
    }
});

