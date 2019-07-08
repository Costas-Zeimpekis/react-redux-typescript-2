import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getPosts, deletePosts } from '../Store/actions';
import { RootState, RootAction, posts } from '../../MyTypes';

type PostsProps = {
  posts: posts;
  getPosts: Function;
  deletePost: Function;
};

class Posts extends Component<PostsProps> {
  componentWillMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    let posts: posts = this.props.posts;
    let title = '';

    if (posts) {
      title = posts.title;
    }

    return <div>Title:{title}</div>;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return {
    getPosts: () => dispatch(getPosts()),
    deletePost: () => dispatch(deletePosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
