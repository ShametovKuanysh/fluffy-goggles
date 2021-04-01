import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addInstitution } from "../../actions/institutionActions";

class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      name: "",
      description: "",
      usual_cost: 0,
      address: "",
      institutiontype: "",
      count_place: 0,
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

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newInstitution = {
      text: this.state.text,
      name: this.state.name,
      description: this.state.description,
      usual_cost: this.state.usual_cost,
      address: this.state.address,
      institutiontype: this.state.institutiontype,
      count_place: this.state.count_place,
    };

    this.props.addInstitution(newInstitution);
    this.setState({
      text: "",
      name: "",
      description: "",
      usual_cost: "",
      address: "",
      institutiontype: "",
      count_place: "",
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select institution type", value: 0 },
      { label: "Cinema", value: "Cinema" },
      { label: "Restoraunt", value: "Restoraunt" },
      { label: "Cafe", value: "Cafe" },
    ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Create your institution
          </div>
          <div className="card-body">
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
                  placeholder="Название заведения"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  type="text"
                />
              </div>
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
          </div>
        </div>
      </div>
    );
  }
}

InstitutionForm.propTypes = {
  addInstitution: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addInstitution })(InstitutionForm);
