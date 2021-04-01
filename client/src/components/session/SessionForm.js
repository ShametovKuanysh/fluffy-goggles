import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addSession } from "../../actions/sessionActions";
const axios = require("axios");

class SessionForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      name: "",
      date: "",
      time: "",
      film: {},
      errors: {},
    };

    // axios
    //   .get("http://localhost:5000/api/films/all/60575a6f6fe1b9412c923578")
    //   .then((res) => {
    //     const posts = res.data;
    //     console.log("Check: ", posts);
    //     // setPost(posts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log("lol", res);

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

    const newSession = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      film: this.state.film,
    };

    this.props.addSession(newSession, this.props.roomId);
    this.setState({
      name: "",
      date: "",
      time: "",
      film: "",
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
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  error={errors.date}
                  type="text"
                  info="Введите информацию о зале"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Количество мест"
                  name="time"
                  value={this.state.time}
                  onChange={this.onChange}
                  error={errors.time}
                  type="text"
                  info="Введите Количество мест"
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Ряды"
                  name="film"
                  value={this.state.film}
                  onChange={this.onChange}
                  error={errors.film}
                  type="text"
                  info="Введите количество рядов"
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

SessionForm.propTypes = {
  addSession: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addSession })(SessionForm);
