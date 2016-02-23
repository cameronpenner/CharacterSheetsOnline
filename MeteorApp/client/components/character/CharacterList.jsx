CharacterList = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            showNewCharForm: false
        };
    },

    getMeteorData() {
        const sub = Meteor.subscribe('character-list');
        return {
            ready: sub.ready(),
            characters: Characters.find().fetch()
        };
    },

    saveNewCharacter(event) {
        event.preventDefault();
        var name = this.refs.name.value;
        Character.upsert({name: name});

        this.refs.name.value = "";
        this.toggleNewCharacterForm();
    },

    toggleNewCharacterForm(event) {
        if (event) event.preventDefault();
        this.setState({
            showNewCharForm: !this.state.setNewCharForm
        });
    },

    renderCharacters() {
        return this.data.characters.map((character) => {
            return (
                <a className="list-group-item"
                    key={character._id}
                    href={"/character/"+character._id}
                ><CharacterPreview
                    _id={character._id}
                /></a>
            );
        });
    },

    render() {
        return (
            <div>
                <h3>Characters List</h3>
                <div className="list-group">
                    {this.data.ready ? this.renderCharacters() : 'loading'}
                </div>
                {this.state.showNewCharForm ?
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               ref="name" />
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.saveNewCharacter}>Save</button>
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.toggleNewCharacterForm}>Cancel</button>
                    </div> :
                    <button type="button"
                            className="btn btn-default"
                            onClick={this.toggleNewCharacterForm}>New Character</button>
                }

            </div>
        );
    }
});
