import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class MealItem extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  render() {
    const { meal, auth } = this.props;
    const { errors } = this.props;

    // Select options for status
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{meal.name}</p>
            <div>
              <p className="lead">{meal.time}</p>
              <p className="lead">{meal.cost}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MealItem);
