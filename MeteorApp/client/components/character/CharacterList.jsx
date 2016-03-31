CharacterList = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            showNewCharForm: false,
            newCharFormError: null
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
            characters: Characters.find().fetch(),
            type: "Presets"
        };
    },

    setError(error) {
        this.setState({
            newCharFormError: error
        });
    },

    saveNewCharacter(event) {
        event.preventDefault();
        var name = this.refs.name.value;
        var setError = this.setError;
        var toggleForm = this.toggleNewCharacterForm;
        type = this.state.type;
        Meteor.call("upsertCharacter", {name: name}, function(err, data){
            if(err) {
                setError(err);
            }
            else {
                toggleForm();
                switch (type) {
                    case "Wizard":
                        Meteor.call("setPath", data.insertedId, "/images/Wizard_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 22"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 89"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 100"});
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Wizard Hat"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Intelligence: 14"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 50"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Staff"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Magic Attack: 22"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Robes"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Magic Defence: 24"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 150"});
                        });
                        break;
                    case "Warrior":
                        Meteor.call("setPath", data.insertedId, "/images/Warrior_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 89"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 20"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 300"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Shield"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Strength: 12"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 200"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Sword"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack: 22"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 80"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Plate Mail"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 60"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 250"});
                        });

                        break;
                    case "Thief":
                        Meteor.call("setPath", data.insertedId, "/images/Thief_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 60"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 10"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 100"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Theif Mask"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Dexterity: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 50"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Dagger"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack: 12"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Critical Strike Chance: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 60"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Black Leather Armour"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });

                        break;
                    case "Archer":
                        Meteor.call("setPath", data.insertedId, "/images/Archer_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 42"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 50"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 150"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Leather Cowl"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Luck: 16"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 70"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Bow"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack (Ranged): 5"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Arrows: 38"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 80"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Leather Armour"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });

                        break;
                    case "Brawler":
                        Meteor.call("setPath", data.insertedId, "/images/Brawler_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 70"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 50"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 100"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Brass Bracelet"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Strength: 20"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 150"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Iron Knuckles"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Cotton Shirt"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 8"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });
                        break;
                    case "Dryad":
                        Meteor.call("setPath", data.insertedId, "/images/Dryad_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 42"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 50"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 150"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Leaf Crown"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Avoidability: 16"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 30"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Leaf Armour"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 8"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        break;
                    case "Bard":
                        Meteor.call("setPath", data.insertedId, "/images/Bard_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 60"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 50"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 100"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Gold Ring"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Charisma: 6"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 80"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Harp"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Magic Attack: 18"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Fancy Attire"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 7"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 80"});
                        });
                        break;
                    case "Gunslinger":
                        Meteor.call("setPath", data.insertedId, "/images/Gunslinger_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 42"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 50"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 150"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Chain Necklace"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Accuracy: 16"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 70"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Pistol"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack (Ranged): 12"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Ammo: 20"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 80"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Cotton Shirt"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 8"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });
                        break;
                    case "Blasksmith":
                        Meteor.call("setPath", data.insertedId, "/images/Blacksmith_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 70"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 0"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 300"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Blacksmith Hammer"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack: 12"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Leather Apron"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 16"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });
                        break;
                    case "Farmer":
                        Meteor.call("setPath", data.insertedId, "/images/Farmer_Icon.png");
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Health: 60"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Mana: 10"});
                        Meteor.call("addCharacterAttribute", data.insertedId, {name: "Equip Load: 180"});

                        Meteor.call("addCharacterItem", data.insertedId, {name: "Brass Hoe"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Weapon Attack: 6"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 40"});
                        });
                        Meteor.call("addCharacterItem", data.insertedId, {name: "Cotton Shirt"}, function(err, data){
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Physical Defence: 8"});
                            Meteor.call("addItemAttribute", data.insertedId, {name: "Durability: 100"});
                        });
                        break;
                }
            }
        });
    },

    toggleNewCharacterForm(event) {
        if (event) event.preventDefault();

        if (this.state.showNewCharForm) {
            this.state.newCharFormError = null;
            this.refs.name.value = '';
        }

        this.setState({
            showNewCharForm: !this.state.showNewCharForm
        });
    },

    setType(event){
        console.log($(event.target).attr('label'));
        this.state.type = $(event.target).attr('label');
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
            <Fader>
                <h3>Characters List</h3>

                <div className="list-group">
                    {this.data.charReady ? this.renderCharacters() : <LoadingImage/>}
                </div>
                {this.state.showNewCharForm ?
                    <div>
                        {this.state.newCharFormError ? <div className="alert alert-danger" role="alert">Error: {this.state.newCharFormError.reason}</div> : ''}
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   ref="name" />

                            <div className="input-group-btn">
                                <button className="btn btn-default dropdown-toggle"
                                        type="button"
                                        id="menu1"
                                        data-toggle="dropdown">{this.data.type}
                                <span className="caret"></span></button>
                                <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Wizard"}
                                                                href = "#"
                                                                onClick={this.setType}>Wizard</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Thief"}
                                                                href = "#"
                                                                onClick={this.setType}>Thief</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Warrior"}
                                                                href = "#"
                                                                onClick={this.setType}>Warrior</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Archer"}
                                                                href = "#"
                                                                onClick={this.setType}>Archer</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Brawler"}
                                                                href = "#"
                                                                onClick={this.setType}>Brawler</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Dryad"}
                                                                href = "#"
                                                                onClick={this.setType}>Dryad</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Bard"}
                                                                href = "#"
                                                                onClick={this.setType}>Bard</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Gunslinger"}
                                                                href = "#"
                                                                onClick={this.setType}>Gunslinger</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Blasksmith"}
                                                                href = "#"
                                                                onClick={this.setType}>Blasksmith</a></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Farmer"}
                                                                href = "#"
                                                                onClick={this.setType}>Farmer</a></li>
                                    <li role="presentation" className="divider"></li>
                                    <li role="presentation"><a role="menuitem"
                                                                tabindex="-1"
                                                                label = {"Presets"}
                                                                href = "#"
                                                                onClick={this.setType}>None</a></li>
                                </ul>
                                <button type="button"
                                        className="btn btn-default"
                                        onClick={this.saveNewCharacter}>Save</button>
                                <button type="button"
                                        className="btn btn-default"
                                        onClick={this.toggleNewCharacterForm}>Cancel</button>
                            </div>
                        </div>
                    </div> :
                    <button type="button"
                            className="btn btn-default"
                            onClick={this.toggleNewCharacterForm}>New Character</button>

                }

            </Fader>
        );
    }
});
