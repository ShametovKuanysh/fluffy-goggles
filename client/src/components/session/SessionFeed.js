import React, { Component } from "react";
import PropTypes from "prop-types";
import SessionItem from "./SessionItem";

class SessionFeed extends Component {
  render() {
    const { sessions } = this.props;

    return sessions.map((session) => (
      <SessionItem key={session._id} session={session} />
    ));
  }
}

SessionFeed.propTypes = {
  sessions: PropTypes.array.isRequired,
};

export default SessionFeed;
