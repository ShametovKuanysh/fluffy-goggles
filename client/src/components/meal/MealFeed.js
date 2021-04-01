import React, { Component } from "react";
import PropTypes from "prop-types";
import MealItem from "./MealItem";

class MealFeed extends Component {
  render() {
    const { meals } = this.props;

    return meals.map((meal) => <MealItem key={meal._id} meal={meal} />);
  }
}

MealFeed.propTypes = {
  meals: PropTypes.array.isRequired,
};

export default MealFeed;
