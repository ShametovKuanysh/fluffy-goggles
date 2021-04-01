import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addRoom } from "../../actions/roomActions";

class RoomForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      name: "",
      description: "",
      place_number: 0,
      rows: 0,
      row_places: 0,
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

    const newRoom = {
      name: this.state.name,
      description: this.state.description,
      place_number: this.state.place_number,
      rows: this.state.rows,
      row_places: this.state.row_places,
    };

    this.props.addRoom(newRoom, this.props.institutionId);
    this.setState({
      name: "",
      description: "",
      place_number: 0,
      rows: 0,
      row_places: 0,
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
                  placeholder="Информация о зале"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  type="text"
                  info="Введите информацию о зале"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Количество мест"
                  name="place_number"
                  value={this.state.place_number}
                  onChange={this.onChange}
                  error={errors.place_number}
                  type="text"
                  info="Введите Количество мест"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Ряды"
                  name="rows"
                  value={this.state.rows}
                  onChange={this.onChange}
                  error={errors.rows}
                  type="text"
                  info="Введите количество рядов"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  label="Количество мест в ряду"
                  placeholder="Количество мест в ряду"
                  name="row_places"
                  value={this.state.row_places}
                  onChange={this.onChange}
                  error={errors.row_places}
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

RoomForm.propTypes = {
  addRoom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addRoom })(RoomForm);
