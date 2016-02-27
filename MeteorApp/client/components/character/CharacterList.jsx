CharacterList = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            showNewCharForm: false
        };
    },

    getMeteorData() {
        const charSub = Meteor.subscribe('character-list');
        const itemSub = Meteor.subscribe('item-list');
        const attrSub = Meteor.subscribe('attribute-list');
        return {
            charReady: charSub.ready(),
            itemReady: itemSub.ready(),
            attrReady: attrSub.ready(),
            characters: Characters.find().fetch()
        };
    },

    saveNewCharacter(event) {
        event.preventDefault();
        var name = this.refs.name.value;
        Meteor.call("upsertCharacter", {name: name});

        this.refs.name.value = "";
        this.toggleNewCharacterForm();
    },

    toggleNewCharacterForm(event) {
        if (event) event.preventDefault();
        this.setState({
            showNewCharForm: !this.state.showNewCharForm
        });
    },

    setType(event) {

        console.log("Setting Preset Data.");
        name = this.refs.name.value;
        console.log(name);
        var c = Meteor.call("upsertCharacter", {name: name}, function() {

        });
        console.log(c);

        var label = this.refs.name.label;
        console.log(label);

        switch (label) {
            case "Wizard":
                Character.addAttribute(c, {name: "Health: 22"});
                Character.addAttribute(c, {name: "Mana: 89"});
                Character.addAttribute(c, {name: "Equip Load: 100"});

                hold = Character.addItem(c, {name: "Hat"});
                console.log(hold);
                hold = Character.addItem(c, {name: "Staff"});
                console.log(hold);
                hold = Character.addItem(c, {name: "Robes"});
                console.log(hold);

                this.toggleNewCharacterForm();
                break;
            case "Warrior":
                Character.addAttribute(c, {name: "Health: 89"});
                Character.addAttribute(c, {name: "Mana: 20"});
                Character.addAttribute(c, {name: "Equip Load: 300"});

                Character.addItem(c, {name: "Shield"});
                Character.addItem(c, {name: "Sword"});
                Character.addItem(c, {name: "Plate Mail"});

                this.toggleNewCharacterForm();
                break;
            case "Theif":
                Character.addAttribute(c, {name: "Health: 60"});
                Character.addAttribute(c, {name: "Mana: 10"});
                Character.addAttribute(c, {name: "Equip Load: 100"});

                Character.addItem(c, {name: "Theif Mask"});
                Character.addItem(c, {name: "Dagger"});
                Character.addItem(c, {name: "Black Leather Armour"});

                this.toggleNewCharacterForm();
                break;
            case "Archer":
                Character.addAttribute(c, {name: "Health: 42"});
                Character.addAttribute(c, {name: "Mana: 50"});
                Character.addAttribute(c, {name: "Equip Load: 150"});

                Character.addItem(c, {name: "Bow"});
                Character.addItem(c, {name: "Leather Armour"});

                this.toggleNewCharacterForm();
                break;
            default:
                console.log("default case");
                this.toggleNewCharacterForm();
        }
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
                    {this.data.charReady ? this.renderCharacters() : 'loading'}
                </div>
                {this.state.showNewCharForm ?
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               ref="name" />
                        <div className="input-group-btn">
                            <button type="button"
                                    className="btn btn-default"
                                    onClick={this.saveNewCharacter}>Save</button>
                            <button type="button"
                                    className="btn btn-default"
                                    onClick={this.toggleNewCharacterForm}>Cancel</button>
                        </div>
                        <div className="input-group-presets">
                            <button type="button"
                                    className="btn btn-default"
                                    label = "Wizard"
                                    onClick={this.setType}>Wizard</button>
                            <button type="button"
                                    className="btn btn-default"
                                    label = "Theif"
                                    onClick={this.setType}>Theif</button>
                            <button type="button"
                                    className="btn btn-default"
                                    label = "Warrior"
                                    onClick={this.setType}>Warrior</button>
                            <button type="button"
                                    className="btn btn-default"
                                    label = "Archer"
                                    onClick={this.setType}>Archer</button>
                        </div>
                    </div> :
                    <button type="button"
                            className="btn btn-default"
                            onClick={this.toggleNewCharacterForm}>New Character</button>
                }

            </div>
        );
    }
});
