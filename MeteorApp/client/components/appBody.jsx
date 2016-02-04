AppBody = React.createClass({
    render() {
        return (
            <div className="container">
                <header>
                    <div><AccountsUIWrapper /></div>
                    <h1>Slaughter the Elves</h1>
                    <div className="nav">
                        <a href="/">Home</a>
                        <a href="/character/list">List</a>
                        <a href="/character/new">New</a>
                    </div>
                </header>
                {this.props.children ? this.props.children : ''}
            </div>
        );
    }
});
