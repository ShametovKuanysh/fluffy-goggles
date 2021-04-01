import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addMeal } from "../../actions/mealActions";

class MealForm extends Component {
  constructor(props) {
    console.log("checking 2: ", props);
    super(props);
    this.state = {
      cost: 0,
      name: "",
      time: 0,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newMeal = {
      cost: this.state.cost,
      name: this.state.name,
      time: this.state.time,
    };

    this.props.addMeal(newMeal, this.props.institutionId);
    this.setState({
      cost: 0,
      name: "",
      time: 0,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Создайте новое блюдо в заведении
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.onChange}
                  error={errors.cost}
                  type="number"
                  info="Введите цену блюда"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Название"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  type="text"
                  info="Введите название вашего блюда"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  label="Время приготовления"
                  placeholder="Время приготовления"
                  name="time"
                  value={this.state.time}
                  onChange={this.onChange}
                  error={errors.time}
                  type="number"
                  info="Введите время приготовления блюда"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

MealForm.propTypes = {
  addMeal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addMeal })(MealForm);
