import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

import NotFound from "./views/NotFound";

const App = () => (
  <>
    <Switch>
      <Route path={routes.home} exact />
      <Route path={routes.movies} exact />
      <Route path={routes.movieDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default App;
