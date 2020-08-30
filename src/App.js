import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

import Navigation from "./components/Navigation/Navigation";

const AsyncHomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "HomePage" */)
);

const AsyncMoviePage = lazy(() =>
  import("./views/Movies" /* webpackChunkName: "MoviesPage" */)
);

const AsyncMovieDetails = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);

const AsyncNotFoundPage = lazy(() =>
  import("./views/NotFound" /* webpackChunkName: "NotFoundPage" */)
);
const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route path={routes.home} exact component={AsyncHomePage} />
        <Route path={routes.movies} exact component={AsyncMoviePage} />
        <Route path={routes.movieDetails} component={AsyncMovieDetails} />
        <Route component={AsyncNotFoundPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
