import React, { Component } from "react";

export default class SearchBox extends Component {
  state = { value: "" };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" className="Button">
            <span className="SearchLabel">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
