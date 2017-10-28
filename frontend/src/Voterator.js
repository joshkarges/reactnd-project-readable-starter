import React, { Component } from 'react';
import { connect } from 'react-redux';
import { voteForPost } from './actions/posts';
import { voteForComment } from './actions/comments';

class Voterator extends Component {
  render() {
    return (
      <div className="voterator">
        <div className="voterator-plus" onClick={this.props[this.props.type].upVote}>
          +
        </div>
        <div className="voterator-score">
          {this.props.voteable.voteScore}
        </div>
        <div className="voterator-minus" onClick={this.props[this.props.type].downVote}>
          -
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    post: {
      upVote: () => dispatch(voteForPost({ id: props.voteable.id, option: 'upVote' })),
      downVote: () => dispatch(voteForPost({ id: props.voteable.id, option: 'downVote' }))
    },
    comment: {
      upVote: () => dispatch(voteForComment({ id: props.voteable.id, option: 'upVote' })),
      downVote: () => dispatch(voteForComment({ id: props.voteable.id, option: 'downVote' }))
    }
  };
};
export default connect(null, mapDispatchToProps)(Voterator);