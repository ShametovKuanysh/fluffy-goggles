import React, { Component } from "react";
import PropTypes from "prop-types";
import InstitutionItem from "./InstitutionItem";

class InstitutionFeed extends Component {
  render() {
    const { institutions } = this.props;

    return institutions.map((institution) => (
      <InstitutionItem key={institution._id} institution={institution} />
    ));
  }
}

InstitutionFeed.propTypes = {
  institutions: PropTypes.array.isRequired,
};

export default InstitutionFeed;
