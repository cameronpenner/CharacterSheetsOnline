CharacterEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {};
    },

    setCharacter(character) {
        this.data.character = character;
        this.refs.name.value = character.name;
        this.refs.item.value = "itemName {parameterName, parameterValue}"; // sample format
    },

    getMeteorData() {
        var _id = this.props.routeParams && this.props.routeParams._id;
        var setCharacter = this.setCharacter;
        var data = {currentUser: Meteor.userId()};

        if (_id) {
            const sub = Meteor.subscribe("character", _id, {
                onReady: function() {
                    setCharacter(Character.find(_id));
                }
            });
            return _.extend(data, {ready: sub.ready(),
                    characters: Character.find()}) 
        }
        return data;
    },

    formInventoryItemsList() {
    	var inventory = this.data.character && this.data.character.inventory;    	
    	if (!inventory) return null;
    	var itemStrings = [];
    	for (var i in inventory) {
        	var itemString =inventory[i].name + "\t";
        	for (var j in inventory[i].parameters) {
        		itemString += "{" + inventory[i].parameters[j].name + ", " + inventory[i].parameters[j].value + "} ";
        		}
        	//itemString = <dir><li>{itemString}<button onClick={this.removeItem()}>Remove</button></li></dir>;
        	itemString = <dir><li>{itemString}</li></dir>;

        	itemStrings.push(itemString);
        }
    	
    	console.log(itemStrings);
        return itemStrings;
    },

    handleSubmit(event) {
        event.preventDefault();

        var character = {name: this.refs.name.value.trim()};
        if (this.data.character) {
            character = _.extend(this.data.character, character);
        }
        else if (this.data.currentUser) {
            character.owner = this.data.currentUser;
        }
        Character.upsert(character);
        this.data.character = character;
    },

    handleAddItem(event) {
        event.preventDefault();

        var itemString = this.refs.item.value.trim();
        var regex = /([a-zA-Z]+) {([a-zA-Z]+), ([0-9a-zA-Z]+)}/ig;
        var match = regex.exec(itemString);

        var itemName = match[1];
        var paramName = match[2];
        var paramValue = match[3];

        var param = {name: match[2], value: match[3]}
        var item = {name: match[1], parameters: [param]}

        Character.addItem(this.data.character, item);

        window.location.reload();
    },

    addAttribute(event){
    	event.preventDefault();

    	if (this.data.character) {
    		var attributeValue = this.refs.addAttr.value.trim();
			Character.addAttribute(this.data.character, attributeValue);
    	} else {
    		console.log("Error adding a new attribute!");
    		console.log(this.data.character);
    		console.log(this.data.character.attributeList);
    		return null;
    	}

    },

    displayAttributes(){
    	if (this.data.character) {
    		//load up all the attributes this character has... somehow
    		return this.data.character.attributeList.map((character) => {
    			return <li>{character}</li>
    		});
    	} else {
    		console.log("Error during display of character attributes!");
    		return null;
    	}
    },

    render() {
        return (
            <div>
                <h3>Edit Character</h3>
                <form className="new-character-name" onSubmit={this.handleSubmit}>
                    <field>
                        <label>Name</label>
                        <input type="text" ref="name" name="name"/>
                    </field>
                    <button type="submit">Save</button>
                </form>
                <h5>Inventory</h5>
                <ul> {this.data.ready? this.formInventoryItemsList() : "loading"} </ul>
                <form className="new-item" onSubmit={this.handleAddItem}>
                    <field>
                        <label>New item</label>
                        <input type="text" ref="item" name="item"/>
                    </field>
                    <button type="add">Add</button>
                </form>

                <h3>Attributes:</h3>
                <ul>
                	{this.data.ready ? this.displayAttributes() : "waiting for data..."}
                </ul>

                <form className="addAttr" onSubmit={this.addAttribute}>
                    <field>
                        <label>Add Attribute</label>
                        <input type="text" ref="addAttr" name="addAttr"/>
                    </field>
                    <button type="submit">Add Attribute</button>
                </form>
            </div>
        );
    }
});

