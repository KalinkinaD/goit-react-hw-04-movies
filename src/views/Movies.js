import React, { Component } from "react";
import movieApi from "../services/movieApi";
import getQueryParams from "../services/queryParams";
import { Link } from "react-router-dom";
import SearchBox from "../components/searchBox";
import Spiner from "../components/Loader";
import style from "./views.module.css";

export default class MoviesPage extends Component {
  state = {
    searchQuery: "",
    findedMovies: [],
    loading: false,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (query) => {
    this.setState({ loading: true });
    movieApi
      .fetchMovieWithQuery(query)
      .then((results) => this.setState({ findedMovies: results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChangeQuery = (query) => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { findedMovies, loading } = this.state;
    return (
      <div className={style.wrapper}>
        <SearchBox onSubmit={this.handleChangeQuery} />
        {loading && <Spiner />}
        {findedMovies.length > 0 && (
          <ul className="MoviesList">
            {findedMovies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movie/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  <div
                    className={style.imgBox}
                    style={
                      movie.backdrop_path
                        ? {
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                          }
                        : {
                            backgroundImage:
                              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSEk-mBRzOOi3YLgngg3UWliWw1xu4QKp_4w&usqp=CAU)",
                          }
                    }
                  ></div>
                  <div className={style.trendBox}>
                    <span className={style.trendTitle}>
                      {movie.title || movie.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
