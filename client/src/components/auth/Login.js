import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginCompany } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const companyData = {
      login: this.state.login,
      password: this.state.password,
    };

    this.props.loginCompany(companyData);
  }

  render() {
    const { errors } = this.state;

    // const { user } = this.props.auth;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Войти</h1>
              <p className="lead text-center">Войдите в ваш аккаунт</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Login"
                  name="login"
                  type="text"
                  value={this.state.login}
                  onChange={this.onChange}
                  error={errors.login}
                  info="Введите ваш логин"
                />
                <TextFieldGroup
                  info="Введите ваш пароль"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginCompany })(Login);
