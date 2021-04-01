import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class RoomItem extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  render() {
    const { room, auth } = this.props;
    const { errors } = this.props;

    // Select options for status
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{room.name}</p>
            <div>
              <p className="lead">{room.description}</p>
              <p className="lead">{room.place_number}</p>
            </div>
          </div>
          <Link to={`/seats/all/${room._id}`} className="btn btn-info mr-1">
            Добавить места
          </Link>
          <Link to={`/sessions/all/${room._id}`} className="btn btn-info mr-1">
            Добавить сеанс
          </Link>
        </div>
      </div>
    );
  }
}

RoomItem.propTypes = {
  room: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RoomItem);
