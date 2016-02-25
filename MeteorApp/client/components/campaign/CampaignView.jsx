CampaignView = React.createClass({

	getInitialState() {
		return({editing: false, canEdit: false});
	},

	componentDidMount() {
		var self = this;
		Meteor.call("canEdit", this.props.campaign, function(err, data) {
			if (data === true) {
				self.enableEditing();
			}
		});
	},

	render() {
		return(
			<div>
			{this.state.canEdit ? 
				<button type="button" className={"btn pull-right " + (this.state.editing ? "btn-primary" : "btn-default")} onClick={this.startEditing}><span className="glyphicon glyphicon-pencil"></span></button> 
			: 
				""}

			{this.state.editing ? 
				<form>
				<input type="text" ref="name" className="formControl" defaultValue={this.props.campaign.name}/>
				<button type="button" className="btn btn-success pull-right" onClick={this.save}><span className="glyphicon glyphicon-ok"></span></button> 
				<h4>Game master: {this.props.campaign.game_master_name}</h4>
				</form>
			: 
				<div>
				<h3>{this.props.campaign.name}</h3>
				<h4>Game master: {this.props.campaign.game_master_name}</h4>
				</div>}
			</div>
		);
	},

	enableEditing() {
		this.setState({canEdit: true});
	},

	startEditing() {
		this.setState({editing: !this.state.editing});
	},

	save() {
		console.log("Save");
		this.props.campaign.name = this.refs.name.value;
		this.setState({editing: false});
		Meteor.call("upsertCampaign", this.props.campaign);
	}

});