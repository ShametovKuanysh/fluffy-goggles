import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addFilm } from "../../actions/filmActions";

class FilmForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      duration: 0,
      name: "",
      description: "",
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

    const newFilm = {
      duration: this.state.duration,
      name: this.state.name,
      description: this.state.description,
    };

    this.props.addFilm(newFilm, this.props.institutionId);
    this.setState({
      duration: 0,
      name: "",
      description: "",
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
                  placeholder="Длительность"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.onChange}
                  error={errors.duration}
                  type="number"
                  info="Введите Длительность"
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
                  label="Описание фильма"
                  placeholder="Описание фильма"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  type="text"
                  info="Введите описание фильма"
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

FilmForm.propTypes = {
  addFilm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addFilm })(FilmForm);
