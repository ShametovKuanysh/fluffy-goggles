import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InstitutionForm from "./InstitutionForm";
import InstitutionFeed from "./InstitutionFeed";
import Spinner from "../common/Spinner";
import { getInstitutions } from "../../actions/institutionActions";

class Institutions extends Component {
  componentDidMount() {
    this.props.getInstitutions();
  }

  render() {
    const { institutions, loading } = this.props.institution;
    let institutionContent;

    if (institutions === null || loading) {
      institutionContent = <Spinner />;
    } else {
      institutionContent = <InstitutionFeed institutions={institutions} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <InstitutionForm institutions={institutions} />
              {institutionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Institutions.propTypes = {
  getInstitutions: PropTypes.func.isRequired,
  institution: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  institution: state.institution,
});

export default connect(mapStateToProps, { getInstitutions })(Institutions);
