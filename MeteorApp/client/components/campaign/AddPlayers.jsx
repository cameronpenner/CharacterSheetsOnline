AddPlayers = React.createClass({
	mixins:[ReactMeteorData],

	getInitialState() {
		return {};
	},

	getMeteorData() {
		return {};
	},

    handlePlayerSubmit(event) {
        event.preventDefault();
        var playerName = this.refs.playerName.value.trim();
        console.log(this.props.campaign);
        Campaign.addPlayer(this.props.campaign, playerName);
    },

	render() {
		return (
			<div>
                <h3>Add Players</h3>
                <form className="add-player" onSubmit={this.handlePlayerSubmit}>
                    <field>
                        <label>Player email</label>
                        <input type="text" ref="playerName" name="playerName"/>
                    </field>
                    <button type="submit">Add</button>
                </form>
            </div>
		);
	}

});