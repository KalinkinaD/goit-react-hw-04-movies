import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import routes from "../../routes";
import movieApi from "../../services/movieApi";
import styles from "./MovieDetailsPage.module.css";
import MovieInfo from "../../components/MovieInfo";

const AsyncCast = lazy(() =>
  import("../../components/cast" /* webpackChunkName: "CastSection" */)
);

const AsyncReviews = lazy(() =>
  import("../../components/reviews" /* webpackChunkName: "ReviewsSection" */)
);

export default class MovieDetailsPage extends Component {
  state = {
    movie: null,
    images: [],
  };

  componentDidMount() {
    movieApi
      .fetchMovieDetails(this.props.match.params.movieId)
      .then((movie) => this.setState({ movie }));
  }

  handleGoBack = () => {
    const {
      location: { state },
      history,
    } = this.props;

    if (state && state.from) {
      return history.push(state.from);
    }
    history.push(routes.movies);
  };

  render() {
    const { movie } = this.state;
    return (
      <div>
        <button className={styles.backBtn} onClick={this.handleGoBack}>
          &#8592; Go back
        </button>
        <br />
        {movie && (
          <>
            <div className={styles.movieWrapper}>
              <div className={styles.imageWrapper}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.original_title}
                />
              </div>
              <div className={styles.detailsWrapper}>
                <h2>
                  {movie.original_title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p>User Score: {movie.vote_average * 10}%</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h4>Genres</h4>
                <p>
                  {movie.genres.reduce(
                    (acc, genre) => (acc += `${genre.name} `),
                    ""
                  )}
                </p>
              </div>
            </div>
            <MovieInfo
              newLocation={{ ...this.props.location.state.from }}
              id={movie.id}
            />
            <Suspense fallback={<h1>Loading...</h1>}>
              <Route path="/movie/:movieId/cast" component={AsyncCast} />
              <Route path="/movie/:movieId/reviews" component={AsyncReviews} />
            </Suspense>
          </>
        )}
      </div>
    );
  }
}
