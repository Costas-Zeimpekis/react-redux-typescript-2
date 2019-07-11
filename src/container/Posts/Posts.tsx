import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { getPosts } from '../Store/actions';
import * as Types from '../../MyTypes';

type PostsProps = {
  posts: Types.posts[];
  getPosts: any;
};

class Posts extends Component<PostsProps> {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts }: { posts: Types.posts[] } = this.props;

    console.log('Length: ', posts.length);
    const styles: React.CSSProperties = { listStyle: 'none', padding: '0' };

    return (
      <div>
        {
          <ul style={styles}>
            {this.props.posts.length >= 0
              ? this.props.posts.map(post => <li>Title: {post.title}</li>)
              : 'Nonono'}
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

// type DispatchProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: any) => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
