import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getPosts } from '../Store/actions';
import * as Types from '../../MyTypes';

type PostsProps = {
  posts: Types.posts[];
  getPosts: any;
};

type PostsState = {
  posts: Types.posts[];
};

class Posts extends Component<PostsProps, PostsState> {
  state: PostsState = {
    posts: this.props.posts
  };

  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate() {
    console.log('yea2h');
    console.log(this.props.posts.length);
    if (this.props.posts.length > 0) {
      // const posts = [...Prevstate.posts, this.props.posts];
      console.log('yeah');
      this.setState({
        posts: this.props.posts
      });
      return true;
    }
    return true;
  }

  render() {
    const { posts }: { posts: Types.posts[] } = this.props;

    console.log('Length: ', posts.length);

    return (
      <div>
        {
          <ul>
            {this.props.posts.map(post => (
              <li>Title: {post.title}</li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: Types.RootState) => {
  return {
    posts: state.posts
  };
};

// const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
//   bindActionCreators(
//     {
//       getPosts
//     },
//     dispatch
//   );

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
