import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RoomItem from "./RoomItem";
import Spinner from "../common/Spinner";
import { getRoom } from "../../actions/roomActions";

class Room extends Component {
  componentDidMount() {
    this.props.getRoom(this.props.match.params.id);
  }

  render() {
    const { room, loading } = this.props.room;
    let roomContent;

    if (room === null || loading || Object.keys(room).length === 0) {
      roomContent = <Spinner />;
    } else {
      roomContent = (
        <div>
          <RoomItem room={room} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/rooms" className="btn btn-light mb-3">
                Залы
              </Link>
              {roomContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  getRoom: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, { getRoom })(Room);
