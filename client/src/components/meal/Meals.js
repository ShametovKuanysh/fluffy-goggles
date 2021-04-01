import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealForm from "./MealForm";
import MealFeed from "./MealFeed";
import Spinner from "../common/Spinner";
import { getMeals } from "../../actions/mealActions";

class Meals extends Component {
  componentDidMount() {
    console.log("checking: ", this.props);
    this.props.getMeals(this.props.match.params.id);
  }

  render() {
    const { meals, loading } = this.props.meal;
    let mealContent;

    if (meals === null || loading) {
      mealContent = <Spinner />;
    } else {
      mealContent = <MealFeed meals={meals} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <MealForm institutionId={this.props.match.params.id} />
              {mealContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  getMeals: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.meal,
});

export default connect(mapStateToProps, { getMeals })(Meals);
