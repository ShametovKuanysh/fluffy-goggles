import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoomForm from "./RoomForm";
import RoomFeed from "./RoomFeed";
import Spinner from "../common/Spinner";
import { getRooms } from "../../actions/roomActions";

class Meals extends Component {
  componentDidMount() {
    this.props.getRooms(this.props.match.params.id);
  }

  render() {
    const { rooms, loading } = this.props.room;
    let roomContent;

    if (rooms === null || loading) {
      roomContent = <Spinner />;
    } else {
      roomContent = <RoomFeed rooms={rooms} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <RoomForm institutionId={this.props.match.params.id} />
              {roomContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Meals.propTypes = {
  getRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, { getRooms })(Meals);
