import React, { Component } from "react";
import PropTypes from "prop-types";
import FilmItem from "./FilmItem";

class FilmFeed extends Component {
  render() {
    const { films } = this.props;

    return films.map((film) => <FilmItem key={film._id} film={film} />);
  }
}

FilmFeed.propTypes = {
  films: PropTypes.array.isRequired,
};

export default FilmFeed;
