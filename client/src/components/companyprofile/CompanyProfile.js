import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CompanyProfileHeader from "./CompanyProfileHeader";
import CompanyProfileAbout from "./CompanyProfileAbout";
import Spinner from "../common/Spinner";
import { getCompanyProfileByHandle } from "../../actions/companyProfileActions";

class CompanyProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCompanyProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.companyprofile.companyprofile === null &&
      this.props.companyprofile.loading
    ) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { companyprofile, loading } = this.props.companyprofile;
    let companyprofileContent;

    if (companyprofile === null || loading) {
      companyprofileContent = <Spinner />;
    } else {
      companyprofileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/companyprofiles"
                className="btn btn-light mb-3 float-left"
              >
                Вернуться в Профили
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <CompanyProfileHeader companyprofile={companyprofile} />
          <CompanyProfileAbout companyprofile={companyprofile} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{companyprofileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  getCompanyProfileByHandle: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.companyprofile,
});

export default connect(mapStateToProps, { getCompanyProfileByHandle })(
  CompanyProfile
);
