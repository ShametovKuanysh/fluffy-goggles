import React, { Component } from "react";
import PropTypes from "prop-types";
import SeatItem from "./SeatItem";

class SeatFeed extends Component {
  render() {
    const { seats } = this.props;

    return seats.map((seat) => <SeatItem key={seat._id} seat={seat} />);
  }
}

SeatFeed.propTypes = {
  seats: PropTypes.array.isRequired,
};

export default SeatFeed;
