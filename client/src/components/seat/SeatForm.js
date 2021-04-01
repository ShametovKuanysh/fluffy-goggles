import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addSeat } from "../../actions/seatActions";

class SeatForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      row: 0,
      place: 0,
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

    const newSeat = {
      row: this.state.row,
      place: this.state.place,
    };

    this.props.addSeat(newSeat, this.props.roomId);
    this.setState({
      row: 0,
      place: 0,
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
            Создайте новый зал в заведении
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Ряды"
                  name="row"
                  value={this.state.row}
                  onChange={this.onChange}
                  error={errors.row}
                  type="text"
                  info="Введите количество рядов"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  label="Количество мест в ряду"
                  placeholder="Количество мест в ряду"
                  name="place"
                  value={this.state.place}
                  onChange={this.onChange}
                  error={errors.place}
                  type="number"
                  info="Введите количество мест в ряду"
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

SeatForm.propTypes = {
  addSeat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addSeat })(SeatForm);
