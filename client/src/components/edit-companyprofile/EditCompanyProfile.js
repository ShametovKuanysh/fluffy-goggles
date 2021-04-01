import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import InputGroup from "../common/InputGroup.js";
import SelectListGroup from "../common/SelectListGroup.js";
import {
  createCompanyProfile,
  getCurrentCompanyProfile,
} from "../../actions/companyProfileActions.js";
import isEmpty from "../../validation/is-empty.js";

class EditCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentCompanyProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }

    if (nextProps.companyprofile.companyprofile) {
      const companyprofile = nextProps.companyprofile.companyprofile;

      const skillsCSV = companyprofile.skills.join(",");

      companyprofile.website = !isEmpty(companyprofile.website)
        ? companyprofile.website
        : "";
      companyprofile.location = !isEmpty(companyprofile.location)
        ? companyprofile.location
        : "";

      companyprofile.bio = !isEmpty(companyprofile.bio)
        ? companyprofile.bio
        : "";

      companyprofile.social = !isEmpty(companyprofile.social)
        ? companyprofile.social
        : {};

      companyprofile.twitter = !isEmpty(companyprofile.social.twitter)
        ? companyprofile.social.twitter
        : "";

      companyprofile.facebook = !isEmpty(companyprofile.social.facebook)
        ? companyprofile.social.facebook
        : "";

      companyprofile.youtube = !isEmpty(companyprofile.social.youtube)
        ? companyprofile.social.youtube
        : "";

      companyprofile.instagram = !isEmpty(companyprofile.social.instagram)
        ? companyprofile.social.instagram
        : "";

      this.setState({
        handle: companyprofile.handle,
        website: companyprofile.website,
        location: companyprofile.location,
        status: companyprofile.status,
        skills: skillsCSV,
        bio: companyprofile.bio,
        twitter: companyprofile.twitter,
        facebook: companyprofile.facebook,
        youtube: companyprofile.youtube,
        instagram: companyprofile.instagram,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const companyprofileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };

    this.props.createCompanyProfile(companyprofileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student of Learning", value: "Student of Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];

    return (
      <div className="crate-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your companyprofile URL. Your full name, company name, nickname"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, JavaScript, PHP"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCompanyProfile.propTypes = {
  createCompanyProfile: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyprofile: state.companyprofile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createCompanyProfile,
  getCurrentCompanyProfile,
})(withRouter(EditCompanyProfile));
