import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class SeatItem extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  render() {
    const { seat, auth } = this.props;
    const { errors } = this.props;

    // Select options for status
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            {/* <p className="lead">{seat.name}</p> */}
            <div>
              <p className="lead">{seat.row}</p>
              <p className="lead">{seat.place}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SeatItem.propTypes = {
  seat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SeatItem);
