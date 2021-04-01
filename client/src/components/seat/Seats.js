import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SeatForm from "./SeatForm";
import SeatFeed from "./SeatFeed";
import Spinner from "../common/Spinner";
import { getSeats } from "../../actions/seatActions";

class Meals extends Component {
  componentDidMount() {
    this.props.getSeats(this.props.match.params.id);
  }

  render() {
    const { seats, loading } = this.props.seat;
    let seatContent;

    if (seats === null || loading) {
      seatContent = <Spinner />;
    } else {
      seatContent = <SeatFeed seats={seats} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SeatForm roomId={this.props.match.params.id} />
              {seatContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  getSeats: PropTypes.func.isRequired,
  seat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  seat: state.seat,
});

export default connect(mapStateToProps, { getSeats })(Meals);
