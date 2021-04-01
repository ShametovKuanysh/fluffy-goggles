import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class CompanyProfileHeader extends Component {
  render() {
    const { companyprofile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                {/* <img
                  className="rounded-circle"
                  src={companyprofile.user.avatar}
                  alt=""
                /> */}
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {companyprofile.company.name}
              </h1>
              <p className="lead text-center">{companyprofile.status} </p>
              {isEmpty(companyprofile.location) ? null : (
                <p>{companyprofile.location}</p>
              )}
              <p>
                {isEmpty(companyprofile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={companyprofile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(
                  companyprofile.social && companyprofile.social.twitter
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={companyprofile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(
                  companyprofile.social && companyprofile.social.facebook
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={companyprofile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(
                  companyprofile.social && companyprofile.social.youtube
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={companyprofile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(
                  companyprofile.social && companyprofile.social.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={companyprofile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyProfileHeader;
