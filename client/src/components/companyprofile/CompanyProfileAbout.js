import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class CompanyProfileAbout extends Component {
  render() {
    const { companyprofile } = this.props;

    console.log(companyprofile);
    // Get First name
    const firstName = companyprofile.company.name.trim().split(" ")[0];

    // Skill list
    const skills = companyprofile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(companyprofile.bio) ? (
                <span>{firstName} - нет био</span>
              ) : (
                <span>{companyprofile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Скиллы</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyProfileAbout.propTypes = {
  companyprofile: PropTypes.object.isRequired,
};

export default CompanyProfileAbout;
