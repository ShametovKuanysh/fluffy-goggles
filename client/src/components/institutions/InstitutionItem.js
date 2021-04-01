import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  addInstitution,
  deleteInstitution,
  addLike,
  removeLike,
} from "../../actions/institutionActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";

class InstitutionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.institution.text,
      description: this.props.institution.description,
      usual_cost: this.props.institution.usual_cost,
      address: this.props.institution.address,
      institutiontype: this.props.institution.institutiontype,
      count_place: this.props.institution.count_place,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onDeleteClick(id) {
    this.props.deleteInstitution(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newInstitution = {
      text: this.state.text,
      description: this.state.description,
      usual_cost: this.state.usual_cost,
      address: this.state.address,
      institutiontype: this.state.institutiontype,
      count_place: this.state.count_place,
    };

    this.props.addInstitution(newInstitution);
    // this.setState({
    //   text: "",
    //   name: "",
    //   description: "",
    //   usual_cost: "",
    //   address: "",
    //   institutiontype: "",
    //   count_place: "",
    // });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.company.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { institution, auth, showActions } = this.props;
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select institution type", value: 0 },
      { label: "Cinema", value: "Cinema" },
      { label: "Restoraunt", value: "Restoraunt" },
      { label: "Cafe", value: "Cafe" },
    ];
    return (
      <div className="card card-body mb-3">
        <div className="row">
          {/* <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={institution.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{institution.name}</p>
          </div> */}
          <div className="col-md-10">
            <p className="lead">{institution.name}</p>

            {institution.user === auth.company.id ? (
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Create a post"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                  />
                </div>
                <SelectListGroup
                  placeholder="Type"
                  name="institutiontype"
                  value={this.state.institutiontype}
                  onChange={this.onChange}
                  options={options}
                  error={errors.institutiontype}
                  // info="Give us an idea of where you are at in your career"
                />
                <div className="form-group">
                  <TextFieldGroup
                    label="Адрес заведения"
                    placeholder="Адрес заведения"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    error={errors.address}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="number"
                    placeholder="Usual cost"
                    name="usual_cost"
                    value={this.state.usual_cost}
                    onChange={this.onChange}
                    error={errors.usual_cost}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="number"
                    placeholder="count_place"
                    name="count_place"
                    value={this.state.count_place}
                    onChange={this.onChange}
                    error={errors.count_place}
                  />
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />
                </div>
                {/* <div className="form-group">
                <SelectListGroup
                  options="institutiontype"
                  placeholder="Description"
                  name="institutiontype"
                  value={this.state.institutiontype}
                  onChange={this.onChange}
                  error={errors.institutiontype}
                />
              </div> */}
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <p className="lead">{institution.text}</p>
                <p className="lead">{institution.description}</p>
                <p className="lead">{institution.usual_cost}</p>
                <p className="lead">{institution.address}</p>
                <p className="lead">{institution.count_place}</p>
                <p className="lead">{institution.date}</p>
              </div>
            )}
            <button
              onClick={this.onLikeClick.bind(this, institution._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": this.findUserLike(institution.likes),
                })}
              />
              <span className="badge badge-light">
                {institution.likes.length}
              </span>
            </button>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, institution._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(institution.likes),
                    })}
                  />
                  <span className="badge badge-light">
                    {institution.likes.length}
                  </span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, institution._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  Unlike
                </button>
                <Link
                  to={`/institution/${institution._id}`}
                  className="btn btn-info mr-1"
                >
                  Comments
                </Link>
                {institution.user === auth.company.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, institution._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    Удалить
                  </button>
                ) : null}
                {institution.institutiontype === "Cinema" ? (
                  <Link
                    to={`/rooms/all/${institution._id}`}
                    className="btn btn-info mr-1"
                  >
                    Добавить Зал
                  </Link>
                ) : null}
                {institution.user === auth.company.id ? (
                  <Link
                    to={`/institution/${institution._id}`}
                    className="btn btn-info mr-1"
                  >
                    Перейти к заведению
                  </Link>
                ) : null}
                {institution.user === auth.company.id ? (
                  <Link
                    to={`/meals/all/${institution._id}`}
                    className="btn btn-info mr-1"
                  >
                    Добавить еду
                  </Link>
                ) : null}
                {institution.institutiontype === "Cinema" ? (
                  <Link
                    to={`/films/all/${institution._id}`}
                    className="btn btn-info mr-1"
                  >
                    Добавить фильм
                  </Link>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

InstitutionItem.defaultProps = {
  showActions: true,
};

InstitutionItem.propTypes = {
  addInstitution: PropTypes.func.isRequired,
  deleteInstitution: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  institution: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addInstitution,
  deleteInstitution,
  addLike,
  removeLike,
})(InstitutionItem);
