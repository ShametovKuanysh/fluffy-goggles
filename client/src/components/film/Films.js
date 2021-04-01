import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FilmForm from "./FilmForm";
import FilmFeed from "./FilmFeed";
import Spinner from "../common/Spinner";
import { getFilms } from "../../actions/filmActions";

class Films extends Component {
  componentDidMount() {
    this.props.getFilms(this.props.match.params.id);
  }

  render() {
    const { films, loading } = this.props.film;
    let filmContent;

    if (films === null || loading) {
      filmContent = <Spinner />;
    } else {
      filmContent = <FilmFeed films={films} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <FilmForm institutionId={this.props.match.params.id} />
              {filmContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Films.propTypes = {
  getFilms: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

export default connect(mapStateToProps, { getFilms })(Films);
