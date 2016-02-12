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
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">RPG Companion</a>
                        </div>
                        {this.data.user ?
                            <ul className="nav navbar-nav">
                                <li><a href="/character/list">Character List</a></li>
                                <li><a href="/character/new">New Character</a></li>
                                <li><a href="/campaign/list">Campaign List</a></li>
                                <li><a href="/campaign/new">New Campaign</a></li>
                                <li><a href="#" onClick={this.logout}>Logout</a></li>
                            </ul>
                            : ''
                        }
                        <div className="nav navbar-nav navbar-right"><AccountsUIWrapper /></div>
                    </nav>
                </header>
                {this.props.children ? this.props.children : ''}
            </div>
        );
    }
});