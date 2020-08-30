import React, { Component } from "react";
import movieApi from "../services/movieApi";
import getQueryParams from "../services/queryParams";
import { Link } from "react-router-dom";
import SearchBox from "../components/searchBox";

export default class MoviesPage extends Component {
  state = {
    searchQuery: "",
    findedMovies: [],
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
    movieApi
      .fetchMovieWithQuery(query)
      .then((results) => this.setState({ findedMovies: results }));
  };

  handleChangeQuery = (query) => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { findedMovies } = this.state;
    return (
      <div>
        <SearchBox onSubmit={this.handleChangeQuery} />
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
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
