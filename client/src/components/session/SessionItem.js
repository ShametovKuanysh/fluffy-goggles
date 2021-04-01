import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class SessionItem extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  render() {
    const { session, auth } = this.props;
    const { errors } = this.props;

    // Select options for status
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{session.name}</p>
            <div>
              <p className="lead">{session.description}</p>
              <p className="lead">{session.place_number}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SessionItem.propTypes = {
  session: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SessionItem);
