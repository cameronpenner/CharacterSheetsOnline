CharacterEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {};
    },

    setCharacter(character) {
        this.data.character = character;
        this.refs.name.value = character.name;
        this.refs.item.value = "itemName {parameterName, parameterValue}"; // sample format
    	//console.log(this.data.character);
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
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
    	console.log(this.data.character);
    	var inventory = this.data.character && this.data.character.inventory;    	
    	if (!inventory) return null;
    	var itemStrings = [];
    	for (var i in inventory) {
            console.log(inventory[i]);
        	var itemString = inventory[i].name + "\t";
        	for (var j in inventory[i].parameters) {
        		itemString += "{" + inventory[i].parameters[j].name + ", " + inventory[i].parameters[j].value + "} ";
        		}
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
        var regex = /([a-zA-Z]+) {([a-zA-Z]+), ([a-zA-Z]+)}/ig;
        var match = regex.exec(itemString);

        var itemName = match[1];
        var paramName = match[2];
        var paramValue = match[3];

        var param = {name: match[2], value: match[3]}
        var item = {name: match[1], parameters: [param]}

        Character.addItem(this.data.character, item);
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
                <ul>
                    <li>{this.data.ready? this.formInventoryItemsList() : "loading"} </li>
                </ul>
                <form className="new-item" onSubmit={this.handleAddItem}>
                    <field>
                        <label>New item</label>
                        <input type="text" ref="item" name="item"/>
                    </field>
                    <button type="add">Add</button>
                </form>
            </div>
        );
    }
});

