SignIn = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            creatingAccount: false,
            error: null
        };
    },

    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    setError(error) {
        this.setState({
            error: error
        });
    },

    toggleCreateAccount(event) {
        if (event) event.preventDefault();
        this.setState({
            creatingAccount: !this.state.creatingAccount
        });
    },

    getInput() {
        'use strict';
        return {
            username: this.refs.username.value.trim(),
            password: this.refs.password.value.trim()
        }
    },

    handleCreate(event) {
        event.preventDefault();
        var user = this.getInput();
        var setError = this.setError;

        Accounts.createUser(user, function(err) {
            if(err) setError(err);
            else Meteor.loginWithPassword(user.username, user.password, function (err) {if (err) setError(err);});
        });
    },

    handleSignIn(event) {
        event.preventDefault();
        var user = this.getInput();
        var setError = this.setError;

        Meteor.loginWithPassword(user.username, user.password, function(err) {if(err) setError(err);});
    },

    render() {
        return (
            <div>
                <h3>{this.state.creatingAccount ? "Create Account" : "Sign In"}</h3>
                <form role="form" onSubmit={this.state.creatingAccount ? this.handleCreate : this.handleSignIn}>
                    {this.state.error != null ? <div className="alert alert-danger" role="alert">Error: {this.state.error.reason}</div> : ''}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" ref="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password" />
                    </div>
                    <div>
                        <button className="btn btn-default" action="submit">{this.state.creatingAccount ? "Create Account" : "Sign In"}</button>
                        &emsp;or <a href="#" onClick={this.toggleCreateAccount}>{this.state.creatingAccount ? "sign in" : "create an account"}</a>
                    </div>
                </form>
            </div>
        )
    }
});