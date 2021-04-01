import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SeatItem from "./SeatItem";
import Spinner from "../common/Spinner";
import { getSeat } from "../../actions/seatActions";

class Seat extends Component {
  componentDidMount() {
    this.props.getSeat(this.props.match.params.id);
  }

  render() {
    const { seat, loading } = this.props.seat;
    let seatContent;

    if (seat === null || loading || Object.keys(seat).length === 0) {
      seatContent = <Spinner />;
    } else {
      seatContent = (
        <div>
          <SeatItem seat={seat} showActions={false} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/seats" className="btn btn-light mb-3">
                Залы
              </Link>
              {seatContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Seat.propTypes = {
  getSeat: PropTypes.func.isRequired,
  seat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  seat: state.seat,
});

export default connect(mapStateToProps, { getSeat })(Seat);
