import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class FilmItem extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  render() {
    const { film, auth } = this.props;
    const { errors } = this.props;

    // Select options for status
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{film.name}</p>
            <div>
              <p className="lead">{film.duration}</p>
              <p className="lead">{film.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FilmItem.propTypes = {
  film: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(FilmItem);
