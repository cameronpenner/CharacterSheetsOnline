const {
    Router,
    Route,
    IndexRoute
} = ReactRouter;

const createHistory = ReactRouter.history.createHistory;

const routes = (
    <Route path="/" component={AppBody}>
        <Route path="character/list" component={CharacterList} />
        <Route path="character/new" component={CharacterEdit} />
        <Route path="character/:_id" component={CharacterEdit} />
    </Route>
);

const router = (
    <Router history={createHistory()}>
        {routes}
    </Router>
);

Meteor.startup(function () {
    ReactDOM.render(router, document.getElementById("app-container"));
});