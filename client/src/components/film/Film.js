import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FilmItem from "./FilmItem";
import Spinner from "../common/Spinner";
import { getFilm } from "../../actions/filmActions";

class Film extends Component {
  componentDidMount() {
    this.props.getFilm(this.props.match.params.id);
  }

  render() {
    const { film, loading } = this.props.film;
    let filmContent;

    if (film === null || loading || Object.keys(film).length === 0) {
      filmContent = <Spinner />;
    } else {
      filmContent = (
        <div>
          <FilmItem film={film} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Мои блюда
              </Link>
              {filmContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Film.propTypes = {
  getFilm: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

export default connect(mapStateToProps, { getFilm })(Film);
