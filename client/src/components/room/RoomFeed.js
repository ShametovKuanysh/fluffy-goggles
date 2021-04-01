import React, { Component } from "react";
import PropTypes from "prop-types";
import RoomItem from "./RoomItem";

class RoomFeed extends Component {
  render() {
    const { rooms } = this.props;

    return rooms.map((room) => <RoomItem key={room._id} room={room} />);
  }
}

RoomFeed.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default RoomFeed;
