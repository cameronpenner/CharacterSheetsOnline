var CharListItem = React.createClass({
    getPath() {
        return "/character/" + this.props.character._id
    },
    removeCharacter(event) {
        event.preventDefault();
        Character.remove(this.props.character);
    },
    render() {
        return <li>
            <a href={this.getPath()}>{this.props.character.name}</a>
            <span> owned by <strong>{this.props.character.owner_name || "public"}</strong></span>
            <button onClick={this.removeCharacter}>Remove</button>
        </li>;
    }
});

CharacterList = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        const sub = Meteor.subscribe('character-list');
        return {
            ready: sub.ready(),
            characters: Character.findAll()
        }
    },

    getListItems() {
        return this.data.characters.map((character) => {
            return <CharListItem
                key={character._id}
                character={character}/>;
        });
    },

    render() {
        return (
            <div>
                <h3>Characters List</h3>
                <ul>
                    {this.data.ready ? this.getListItems() : 'loading'}
                </ul>
            </div>
        );
    }
});
