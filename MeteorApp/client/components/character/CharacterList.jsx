CharacterList = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        const sub = Meteor.subscribe('character-list');
        return {
            ready: sub.ready(),
            characters: Character.findAll()
        }
    },

    appFormData(_id) {
        const sub = Meteor.subscribe('character');
        var data = {
            ready: sub.ready(),
            object: Character.find(_id),
            fields: []
        };

        if (data.object) {
            data.fields = [{
                label: "name",
                value: data.object.name
            }];
        }
        return data;
    },

    renderChildren() {
        return this.data.characters.map((character) => {
            return (
                <CharacterPreview
                    _id={character._id}
                    path={"/character/"+character._id}
                />
            );
        });
    },

    render() {
        return (
            <div>
                <h3>Characters List</h3>
                <ul>
                    {this.data.ready ? this.renderChildren() : 'loading'}
                </ul>
            </div>
        );
    }
});
