const {
    Router,
    Route,
    IndexRoute
} = ReactRouter;

const createHistory = ReactRouter.history.createHistory;

const routes = (
    <Route path="/" component={AppBody}>
        <Route path="character/list" component={CharacterList} />
        <Route path="character/:_id" component={CharacterView} />
        <Route path="campaign/list" component={CampaignList} />
        <Route path="character/:_id/item/:_id" component={ItemView} />
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