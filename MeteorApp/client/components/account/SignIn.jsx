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
                <form onSubmit={this.state.creatingAccount ? this.handleCreate : this.handleSignIn}>
                    <field>
                        <label>Username</label>
                        <input type="text" ref="username" />
                    </field>
                    <field>
                        <label>Password</label>
                        <input type="password" ref="password" />
                    </field>
                    <button action="submit">{this.state.creatingAccount ? "Create Account" : "Sign In"}</button>
                </form>
                <p>or <a href="#" onClick={this.toggleCreateAccount}>{this.state.creatingAccount ? "sign in" : "create an account"}</a></p>
            </div>
        )
    }
});