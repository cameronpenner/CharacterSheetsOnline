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
            return (
                <AppForm
                    startOnEdit={false}
                    key={character._id}
                    object={character}
                    upsertMethod={Character.changeName}
                    removeMethod={Character.remove}
                    values={[{
                        label: "name",
                        value: character.name
                    }]}
                >
                    <li>
                        <strong>{character.name}</strong>
                        <small> owned by </small>
                        {character.username}
                    </li>
                </AppForm>
            );
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
