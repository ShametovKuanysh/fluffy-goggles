import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class CompanyProfileItem extends Component {
  render() {
    const { companyprofile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {/* <img
              src={companyprofile.company.avatar}
              alt=""
              className="rounded-circle"
            /> */}
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{companyprofile.company.name}</h3>
            <p>{companyprofile.status} </p>
            <p>
              {isEmpty(companyprofile.location) ? null : (
                <span>{companyprofile.location}</span>
              )}
            </p>
            <Link
              to={`/companyprofile/${companyprofile.handle}`}
              className="btn btn-info"
            >
              Смотреть Профиль
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Скиллы</h4>
            <ul className="list-group">
              {companyprofile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

CompanyProfileItem.propTypes = {
  companyprofile: PropTypes.object.isRequired,
};

export default CompanyProfileItem;
