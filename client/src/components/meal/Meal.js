import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MealItem from "./MealItem";
import Spinner from "../common/Spinner";
import { getMeal } from "../../actions/mealActions";

class Meal extends Component {
  componentDidMount() {
    this.props.getMeal(this.props.match.params.id);
  }

  render() {
    const { meal, loading } = this.props.meal;
    let mealContent;

    if (meal === null || loading || Object.keys(meal).length === 0) {
      mealContent = <Spinner />;
    } else {
      mealContent = (
        <div>
          <MealItem meal={meal} showActions={false} />
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
              {mealContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Meal.propTypes = {
  getMeal: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
});

export default connect(mapStateToProps, { getMeal })(Meal);
