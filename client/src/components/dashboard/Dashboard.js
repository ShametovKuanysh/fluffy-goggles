import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentCompanyProfile,
  deleteAccount,
} from "../../actions/companyProfileActions";
import Spinner from "../common/Spinner";
import CompanyProfileActions from "./CompanyProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentCompanyProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { company } = this.props.auth;
    const { companyprofile, loading } = this.props.companyprofile;

    let dashboardContent;

    if (companyprofile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in company has companyprofile data
      if (Object.keys(companyprofile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Добро пожаловать{" "}
              <Link to={`/companyprofile/${companyprofile.handle}`}>
                {company.name}
              </Link>
            </p>
            <CompanyProfileActions />

            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Удалить аккаунт
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no companyprofile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Добро пожаловать {company.name}</p>
            <p>У вас нет профиля</p>
            <Link to="/create-companyprofile" className="btn btn-lg btn-info">
              Создать профиль
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  companyprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.companyprofile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentCompanyProfile,
  deleteAccount,
})(Dashboard);
