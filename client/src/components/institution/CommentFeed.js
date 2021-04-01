import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, institutionId } = this.props;

    return comments.map((comment) => (
      <CommentItem
        key={comment._id}
        comment={comment}
        institutionId={institutionId}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  institutionId: PropTypes.string.isRequired,
};

export default CommentFeed;
