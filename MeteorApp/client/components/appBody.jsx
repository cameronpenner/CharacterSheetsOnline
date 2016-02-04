AppBody = React.createClass({
    render() {
        return (
            <div className="container">
                <header>
                    <h1>KARCTURZ</h1>
                    <AccountsUIWrapper />
                    <a href="/">Home</a>
                    <a href="/character/list">List</a>
                    <a href="/character/new">New</a>
                </header>
                {this.props.children ? this.props.children : ''}
            </div>
        );
    }
});
