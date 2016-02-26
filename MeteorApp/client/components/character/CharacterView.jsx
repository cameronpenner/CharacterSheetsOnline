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

    renderForm(name, value, key) {
        if (!this.state.renderOneEdit) {
            this.state.renderOneEdit = true;

            //can't delete the name
            var deleteFunc = null;
            if (this.state.editing != "Name: " && this.state.editing != this.data.character.name) {
                deleteFunc = this.delete;
            }

            return (
                <li key={name}
                    className="list-group-item">
                    <Form name={name}
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

    displayItem(id) {
        item = Items.findOne(id);
        console.log(id);
        console.log(item);
        return item.name;
    },

    displayAttribute(id) {
        attribute = Attributes.findOne(id);
        console.log(id);
        console.log(attribute);
        return attribute.name;
    },

    render() {
        if (this.data.ready) {
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
                                <li className="list-group-item"
                                            key={attribute}
                                            onClick={this.setEditingState}>loading...</li>
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
                                if (this.checkEditingState(this.displayItem(item))) {
                                    return this.renderForm("Item", this.displayItem(item), item);
                                }
                                else {
                                    return (
                                        <li className="list-group-item"
                                            key={item}
                                            onClick={this.setEditingState}>{this.displayItem(item)}</li>
                                    );
                                }
                            
                            }
                            else {
                                <li className="list-group-item"
                                            key={item}
                                            onClick={this.setEditingState}>loading...</li>
                            }
                        }, this)}
                    </div>
                    {this.checkEditingState("New Item") ?
                        this.renderForm("New Item", "") :
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.setEditingState}>New Item</button>
                    }
                </div>
            );
        }
        else {
            return <div>loading</div>;
        }
    }
});
