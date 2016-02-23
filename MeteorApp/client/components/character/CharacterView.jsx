CharacterView = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: false,
            renderOneEdit: false
        };
    },

    getMeteorData() {
        if (!this.props.routeParams._id) {
            return {
                ready: true,
                character: Character.getEmptyJSON()
            };
        }
        var _id = this.props.routeParams._id;

        const sub = Meteor.subscribe("character", _id);

        return {
            ready: sub.ready(),
            character: Character.find(_id)
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
            name = $(event.target.parentNode.previousSibling).attr("id"),
            c = this.data.character;
        if (value.length == 0) return; // or maybe throw an error?

        switch (name) {
            case "New Attribute":
                Character.addAttribute(c, value);
                break;
            case "Attribute":
                var i = c.attributeList.indexOf(this.state.editing);
                if (i < 0) return; // should be an error
                c.attributeList[i] = value;
                Character.upsert(c);
                break;
            case "New Inventory":
                Character.addItem(c, {name: value});
                break;
            case "Inventory":
                var el = _.find(c.inventory, function(item) {
                    return item.name == this.state.editing
                }, this);
                var i = c.inventory.indexOf(el);
                c.inventory[i].name = value;
                Character.upsert(c);
                break;
            case "Name":
                c.name = value;
                Character.upsert(c);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();
    },

    delete(event) {
        event.preventDefault();
        //handle deleting similar to how saving is handled...

        this.cancelEdit();
    },

    cancelEdit(event) {
        if (event) event.preventDefault();
        this.setState({
            editing: false,
            renderOneEdit: false
        })
    },

    renderForm(name, value) {
        if (!this.state.renderOneEdit) {
            this.state.renderOneEdit = true;
            return (
                <li key={name}
                    className="list-group-item">
                    <Form name={name}
                          value={value}
                          save={this.save}
                          delete={this.delete}
                          cancel={this.cancelEdit}/>
                </li>
            );
        }
        else {
            return <div>Error Rendering Form...</div>;
        }
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
                        {_.map(this.data.character.attributeList, function (item) {
                            if (this.checkEditingState(item)) {
                                return this.renderForm("Attribute", item)
                            }
                            else {
                                return (
                                    <li className="list-group-item"
                                        key={item}
                                        onClick={this.setEditingState}>{item}</li>
                                );
                            }
                        }, this)}
                    </div>
                    {this.checkEditingState("New Attribute") ?
                        this.renderForm("New Attribute", "") :
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.setEditingState}>New Attribute</button>
                    }


                    <h3>Inventory</h3>
                    <div className="list-group">
                        {_.map(this.data.character.inventory, function (item) {
                            if (this.checkEditingState(item.name)) {
                                return this.renderForm("Inventory", item.name);
                            }
                            else {
                                return (
                                    <li className="list-group-item"
                                        key={item.name}
                                        onClick={this.setEditingState}>{item.name}</li>
                                );
                            }
                        }, this)}
                    </div>
                    {this.checkEditingState("New Inventory") ?
                        this.renderForm("New Inventory", "") :
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.setEditingState}>New Inventory</button>
                    }
                </div>
            );
        }
        else {
            return <div>loading</div>;
        }
    }
});
