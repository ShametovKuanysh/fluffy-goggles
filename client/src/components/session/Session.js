import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SessionItem from "./SessionItem";
import Spinner from "../common/Spinner";
import { getSession } from "../../actions/sessionActions";

class Session extends Component {
  componentDidMount() {
    this.props.getSession(this.props.match.params.id);
  }

  render() {
    const { session, loading } = this.props.session;
    let sessionContent;

    if (session === null || loading || Object.keys(session).length === 0) {
      sessionContent = <Spinner />;
    } else {
      sessionContent = (
        <div>
          <SessionItem session={session} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/sessions" className="btn btn-light mb-3">
                Залы
              </Link>
              {sessionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Session.propTypes = {
  getSession: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps, { getSession })(Session);
