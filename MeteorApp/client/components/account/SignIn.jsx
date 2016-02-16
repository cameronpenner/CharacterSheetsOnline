SignIn = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            creatingAccount: false
        };
    },

    getMeteorData() {
        return {
            user: Meteor.user()
        };
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

        Accounts.createUser(user, function() {
            Meteor.loginWithPassword(user.username, user.password);
        });
    },

    handleSignIn(event) {
        event.preventDefault();
        var user = this.getInput();
        Meteor.loginWithPassword(user.username, user.password);
    },

    render() {
        return (
            <div className="signin">
                <h3>{this.state.creatingAccount ? "Create Account" : "Sign In"}</h3>
                <form role="form" className="span-4" onSubmit={this.state.creatingAccount ? this.handleCreate : this.handleSignIn}>
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