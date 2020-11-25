import React, { Component } from "react";
import { Link } from "react-router-dom";
import movieApi from "../services/movieApi";
import style from "./views.module.css";
import Spiner from "../components/Loader"


export default class HomePage extends Component {
  state = {
    trends: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true})
    movieApi
      .fetchMovieTrends()
      .then((results) => this.setState({ trends: results }))
      .catch(err => this.setState({ err }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { trends, loading } = this.state;
    return (
      <div className={style.wrapper}>
        <h2 className={style.title}>Trending today</h2>
        {loading && <Spiner/>}
        {trends.length > 0 && (
          <ul className={style.trendList}>
            {trends.map((movie) => (
              <li className={style.trendItem}
              key={movie.id}>
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
