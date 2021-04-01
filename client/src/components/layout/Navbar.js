import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCompany } from "../../actions/authActions";
import { clearCurrentCompanyProfile } from "../../actions/companyProfileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentCompanyProfile();
    this.props.logoutCompany();
  }

  render() {
    const { isAuthenticated, company } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Все заведения
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/meals">
            Все блюда
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/rooms">
            Все залы
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Личный кабинет
          </Link>
        </li>

        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connecte to your email to display an image"
            />{" "} */}
            Выйти
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Регистрация
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Войти
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ReservEat Admin Page
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/companyprofiles">
                  {" "}
                  Компании
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logoutCompany,
  clearCurrentCompanyProfile,
})(Navbar);
