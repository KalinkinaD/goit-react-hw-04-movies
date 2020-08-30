import React, { Component } from "react";
import movieApi from "../services/movieApi";

const damagedImg = "https://static.thenounproject.com/png/340719-200.png";

export default class Cast extends Component {
  state = { cast: null };

  componentDidMount() {
    movieApi
      .fetchMovieCast(this.props.match.params.movieId)
      .then((cast) => this.setState({ cast }));
  }

  render() {
    const { cast } = this.state;
    return (
      <>
        {cast && (
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                <>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w154/${actor.profile_path}`
                        : `${damagedImg}`
                    }
                    alt={actor.id}
                  />
                  <p>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
