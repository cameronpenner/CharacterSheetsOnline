AppBody = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    logout() {
        Meteor.logout();
    },

    render() {
        return (
            <div className="container">
                <header>
                    <div>{this.data.user ? "Logged in: " + this.data.user.username : ''}</div>
                    <h1>RPG Companion</h1>
                    {this.data.user ?
                        <div className="nav">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/character/list">Character List</a></li>
                                <li><a href="/character/new">New Character</a></li>
                                <li><a href="/campaign/list">Campaign List</a></li>
                                <li><a href="/campaign/new">New Campaign</a></li>
                                <li><a href="#" onClick={this.logout}>Logout</a></li>
                            </ul>
                        </div>
                        : ''
                    }
                </header>
                {this.data.user ? this.props.children : <SignIn/>}
            </div>
        );
    }
});
