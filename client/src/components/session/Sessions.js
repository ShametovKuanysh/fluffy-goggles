import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SessionForm from "./SessionForm";
import SessionFeed from "./SessionFeed";
import Spinner from "../common/Spinner";
import { getSessions } from "../../actions/sessionActions";

class Sessions extends Component {
  componentDidMount() {
    this.props.getSessions(this.props.match.params.id);
  }

  render() {
    // const { sessions, loading } = this.props.session;
    // let sessionContent;

    // if (sessions === null || loading) {
    //   sessionContent = <Spinner />;
    // } else {
    //   sessionContent = <SessionFeed sessions={sessions} />;
    // }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SessionForm roomId={this.props.match.params.id} />
              {/* {sessionContent} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sessions.propTypes = {
  getSessions: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps, { getSessions })(Sessions);
