var CharListItem = React.createClass({
    render() {
        return <li>{this.props.character.name}</li>;
    }
});

Character.list = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        const sub = Meteor.subscribe('character-list');
        return {
            ready: sub.ready(),
            characters: Collections.Character.find().fetch()
        }
    },

    charNames() {
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
                    {this.data.ready ? this.charNames() : 'loading'}
                </ul>
                <a href="/character/new">Create a New Character</a>
            </div>
        );
    }
});
