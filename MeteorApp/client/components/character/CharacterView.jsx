CharacterView = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: false,
            renderOneEdit: false
        };
    },

    getMeteorData() {
        if (!this.props.routeParams._id) return {};
        var _id = this.props.routeParams._id;

        const charSub = Meteor.subscribe("character", _id);
        const itemSub = Meteor.subscribe('item-list');
        const attrSub = Meteor.subscribe('attribute-list');

        return {
            ready: charSub.ready(),
            itemReady: itemSub.ready(),
            attrReady: attrSub.ready(),
            character: Characters.findOne(_id)
        };
    },

    checkEditingState(str) {
        return this.state.renderOneEdit == false &&
            this.state.editing == str;
    },

    setEditingState(event) {
        event.preventDefault();
        this.setState({
            editing: event.target.textContent,
            renderOneEdit: false
        });
    },

    save(event) {
        event.preventDefault();
        var value = event.target.parentNode.previousSibling.value,
            id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.character;
        if (value.length == 0) return; // or maybe throw an error?
        switch (name) {
            case "New Attribute":
                Meteor.call("addCharacterAttribute", c._id, {name: value});
                break;
            case "Attribute":
                console.log(id);
                attribute = Attributes.findOne(id);
                console.log(attribute);
                attribute.name = value;
                console.log(attribute);
                Meteor.call("upsertAttribute", attribute);
                Meteor.call("upsertCharacter", c);
                break;
            case "New Item":
                Meteor.call("addCharacterItem", c._id, {name: value});
                break;
            case "Item":
                console.log(id);
                item = Items.findOne(id);
                console.log(item);
                item.name = value;
                console.log(item);
                Meteor.call("upsertItem", item);
                Meteor.call("upsertCharacter", c);
                break;
            case "Name":
                c.name = value;
                Meteor.call("upsertCharacter", c);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();
    },

    delete(event) {
        event.preventDefault();
        var id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.character;
        switch (name) {
            case "Attribute":
                Meteor.call("removeCharacterAttribute", c._id, id);
                break;
            case "Item":
                Meteor.call("removeCharacterItem", c._id, id);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();    
    },

    cancelEdit(event) {
        if (event) event.preventDefault();
        this.setState({
            editing: false,
            renderOneEdit: false
        })
    },

    deleteAll(){
        console.log("Deleting all");
        c = this.data.character;

        Meteor.call("removeAll", c._id);

        console.log("FinishedDeleting");
    },

    setType(event) {
        console.log(event);
        console.log("Setting Preset Data.");
        var c = this.data.character;
        console.log(c);
        console.log(event.target);
        label = $(event.target).attr('label');
        console.log(label);

        switch (label) {
            case "Wizard":
                this.deleteAll();
                Meteor.call("addCharacterAttribute", c._id, {name: "Health: 22"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Mana: 89"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Equip Load: 100"});

                Meteor.call("addCharacterItem", c._id, {name: "Hat"});
                Meteor.call("addCharacterItem", c._id, {name: "Staff"});
                Meteor.call("addCharacterItem", c._id, {name: "Robes"});
                break;
            case "Warrior":
                this.deleteAll();
                Meteor.call("addCharacterAttribute", c._id, {name: "Health: 89"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Mana: 20"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Equip Load: 300"});

                Meteor.call("addCharacterItem", c._id, {name: "Shield"});
                Meteor.call("addCharacterItem", c._id, {name: "Sword"});
                Meteor.call("addCharacterItem", c._id, {name: "Plate Mail"});

                break;
            case "Thief":
                this.deleteAll();
                Meteor.call("addCharacterAttribute", c._id, {name: "Health: 60"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Mana: 10"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Equip Load: 100"});

                Meteor.call("addCharacterItem", c._id, {name: "Theif Mask"});
                Meteor.call("addCharacterItem", c._id, {name: "Dagger"});
                Meteor.call("addCharacterItem", c._id, {name: "Black Leather Armour"});

                break;
            case "Archer":
                this.deleteAll();
                Meteor.call("addCharacterAttribute", c._id, {name: "Health: 42"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Mana: 50"});
                Meteor.call("addCharacterAttribute", c._id, {name: "Equip Load: 150"});

                Meteor.call("addCharacterItem", c._id, {name: "Bow"});
                Meteor.call("addCharacterItem", c._id, {name: "Leather Armour"});

                break;
            default:
                console.log("default case");
        }
    },

    renderForm(name, value, key) {
        if (!this.state.renderOneEdit) {
            this.state.renderOneEdit = true;

            //can't delete the name
            var deleteFunc = null;
            if (this.state.editing != "Name: " && this.state.editing != this.data.character.name) {
                deleteFunc = this.delete;
            }

            var tempID = new Mongo.ObjectID();

            return (
                <li key={tempID}
                    className="list-group-item">
                    <Form tempID={tempID}
                          name={name}
                          value={value}
                          id={key}
                          save={this.save}
                          delete={deleteFunc}
                          cancel={this.cancelEdit}/>
                </li>
            );
        }
        else {
            return <div onClick={this.cancelEdit}>Error Rendering Form...</div>;
        }
    },

    deleteCharacter(event) {
        this.deleteAll();//all data is deleted
        Meteor.call("removeCharacter", this.data.character);
        //navigate to the character list.
    },

    displayItem(id) {
        item = Items.findOne(id);
        return item.name;
    },

    displayAttribute(id) {
        attribute = Attributes.findOne(id);
        return attribute.name;
    },

    render() {
        if (this.data.ready) {
            if (this.data.character){
                return (
                    <div className="container">
                        {this.checkEditingState("Name: ") || this.checkEditingState(this.data.character.name) ?
                            this.renderForm("Name", this.data.character.name) :
                            <h2 onClick={this.setEditingState}>Name: {this.data.character.name}</h2>
                        }


                        <h4>Owner: {this.data.character.owner_name}</h4>


                        <h3>Attributes</h3>
                        <div className="list-group">
                            {_.map(this.data.character.attributes, function (attribute) {
                                if(this.data.attrReady){
                                    if (this.checkEditingState(this.displayAttribute(attribute))) {
                                        return this.renderForm("Attribute", this.displayAttribute(attribute), attribute)
                                    }
                                    else {
                                        return (
                                            <li className="list-group-item"
                                                key={attribute}
                                                onClick={this.setEditingState}>{this.displayAttribute(attribute)}</li>
                                        );
                                    }
                                }
                                else {
                                    return (<li className="list-group-item"
                                                key={attribute}
                                                onClick={this.setEditingState}>loading...</li>);
                                }
                            }, this)}
                        </div>
                        {this.checkEditingState("New Attribute") ?
                            this.renderForm("New Attribute", "") :
                            <button type="button"
                                    className="btn btn-default"
                                    onClick={this.setEditingState}>New Attribute</button>
                        }


                        <h3>Items</h3>
                        <div className="list-group">
                            {_.map(this.data.character.items, function (item) {
                                if(this.data.itemReady){
                                    return (
                                            <a className="list-group-item"
                                                key={item}
                                                href={this.data.character._id+"/item/"+item}>{this.displayItem(item)}</a>
                                    );
                                
                                }
                                else {
                                    return (<li className="list-group-item"
                                                key={item}
                                                onClick={this.setEditingState}>loading...</li>);
                                }
                            }, this)}
                        </div>
                        {this.checkEditingState("New Item") ?
                            this.renderForm("New Item", "") :
                            <button type="button"
                                    className="btn btn-default"
                                    onClick={this.setEditingState}>New Item</button>
                        }
                        <h3>Presets</h3>
                        <div className="input-group-presets">
                            <button type="button"
                                    className="Wizard Button"
                                    label = {"Wizard"}
                                    onClick={this.setType}>Wizard</button>
                            <button type="button"
                                    className="Thief Button"
                                    label = {"Thief"}
                                    onClick={this.setType}>Thief</button>
                            <button type="button"
                                    className="Warrior Button"
                                    label = {"Warrior"}
                                    onClick={this.setType}>Warrior</button>
                            <button type="button"
                                    className="Archer Button"
                                    label = {"Archer"}
                                    onClick={this.setType}>Archer</button>
                        </div>
                        <h3> </h3>
                        <button type="button"
                                className="btn btn-default"
                                href={"/"}
                                onClick={this.deleteCharacter}>Delete Character</button>
                    </div>
                );
            }
            else {
                return (
                    <div> 
                        <h3>No valid item found</h3>
                        <a style={{color:'black',textDecoration:'none'}}
                            href={"/character/list/"}><button>Return to Character List</button></a>
                    </div>
                    );
            }
        }
        else {
            return <div>loading</div>;
        }
    }
});
