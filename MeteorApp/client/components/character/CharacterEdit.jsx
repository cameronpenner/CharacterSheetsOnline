CharacterEdit = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {};
    },

    setCharacter(character) {
        this.data.character = character;
        this.refs.name.value = character.name;
        this.refs.item.value = "itemName {parameterName, parameterValue}";
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
        var setCharacter = this.setCharacter;
        var data = {currentUser: Meteor.userId()};

        if (_id) {
            Meteor.subscribe("character", _id, {
                onReady: function() {
                    setCharacter(Character.find(_id));
                }
            });
        }
        return data;
    },

    formInventoryItemsList() {
    	var inventory = this.data.character && this.data.character.inventory;
    	//console.log(this.data.character);
    	if (!inventory) return null;

    	var itemStings = new Array();    
		for (item in inventory.items) {
        	var itemString = item.name + "\t";
        	for (parameter in item.parameters) {
        		itemString += "{" + parameter.name + ", " + parameter.value + "} "; 
        	}
        	itemStings.push(itemString);
        }
        return itemStings;
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
    },

    handleAddItem(event) {
        event.preventDefault();

        var itemString = this.refs.item.value.trim();
        var regex = /[a-zA-Z]+ {[a-zA-Z]+, [a-zA-Z]+}/ig;
        var match = regex.exec(itemString);

        console.log(match[0]);
        console.log(match[1]);
        console.log(match[2]);

        // if (this.data.character) {
        //     character = _.extend(this.data.character, character);
        // }
        // else if (this.data.currentUser) {
        //     character.owner = this.data.currentUser;
        // }
        // Character.upsert(character);
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
                    {this.formInventoryItemsList()}
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

