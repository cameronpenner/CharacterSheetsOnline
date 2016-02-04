CharacterEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {};
    },

    setCharacter(character) {
        this.data.character = character;
        this.refs.name.value = character.name;
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
        var setCharacter = this.setCharacter;
        var data = {currentUser: Meteor.userId()};

        if (_id) {
            Meteor.subscribe("character", _id, {
                onReady: function() {
                    setCharacter(Character.find(_id));
                }
            });
        }
        return data;
    },

    handleSubmit(event) {
        event.preventDefault();

        var character = {name: this.refs.name.value.trim()};
        if (this.data.character) {
            character = _.extend(this.data.character, character);
        }
        else if (this.data.currentUser) {
            character.owner = this.data.currentUser;
        }
        Character.upsert(character);
    },

    render() {
        return (
            <div>
                <h3>Edit Character</h3>
                <form className="new-character" onSubmit={this.handleSubmit}>
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

