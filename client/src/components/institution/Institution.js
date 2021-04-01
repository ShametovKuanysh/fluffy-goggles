import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InstitutionItem from "../institutions/InstitutionItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";
import { getInstitution } from "../../actions/institutionActions";

class Institution extends Component {
  componentDidMount() {
    this.props.getInstitution(this.props.match.params.id);
  }

  render() {
    const { institution, loading } = this.props.institution;
    let institutionContent;

    if (
      institution === null ||
      loading ||
      Object.keys(institution).length === 0
    ) {
      institutionContent = <Spinner />;
    } else {
      institutionContent = (
        <div>
          <InstitutionItem institution={institution} showActions={false} />
          {/* <CommentForm institutionId={institution._id} />
          <CommentFeed
            institutionId={institution._id}
            comments={institution.comments}
          /> */}
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Мои заведения
              </Link>
              {institutionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Institution.propTypes = {
  getInstitution: PropTypes.func.isRequired,
  institution: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  institution: state.institution,
});

export default connect(mapStateToProps, { getInstitution })(Institution);
