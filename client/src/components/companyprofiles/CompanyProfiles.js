import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import CompanyProfileItem from "./CompanyProfileItem";
import { getCompanyProfiles } from "../../actions/companyProfileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getCompanyProfiles();
  }

  render() {
    const { companyprofiles, loading } = this.props.companyprofile;
    let companyprofileItems;

    if (companyprofiles === null || loading) {
      companyprofileItems = <Spinner />;
    } else {
      if (companyprofiles.length > 0) {
        companyprofileItems = companyprofiles.map((companyprofile) => (
          <CompanyProfileItem
            key={companyprofile._id}
            companyprofile={companyprofile}
          />
        ));
      } else {
        companyprofileItems = <h4>Не найдены профили...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Профили других админов</h1>
              <p className="lead text-center">Просматривайте их профили</p>
              {companyprofileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getCompanyProfiles: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.companyprofile,
});

export default connect(mapStateToProps, { getCompanyProfiles })(Profiles);
