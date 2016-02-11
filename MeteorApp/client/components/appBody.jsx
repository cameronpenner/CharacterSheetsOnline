AppBody = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    render() {
        return (
            <div className="container">
                <header>
                    <div><AccountsUIWrapper /></div>
                    <h1>RPG Companion</h1>
                    {this.data.user ?
                        <div className="nav">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/character/list">Character List</a></li>
                                <li><a href="/character/new">New Character</a></li>
                                <li><a href="/campaign/list">Campaign List</a></li>
                                <li><a href="/campaign/new">New Campaign</a></li>
                            </ul>
                        </div>
                        : "Please Sign In"
                    }
                </header>
                {this.data.user ? this.props.children : ''}
            </div>
        );
    }
});
