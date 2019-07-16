import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, PostsActionsThunkDispatch } from '../Store/actions';
import { PostType, RootState, PostsProps } from '../../MyTypes';
import Post from './Post/Post';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Box, Typography } from '@material-ui/core';
import { FastRewind, FastForward } from '@material-ui/icons';

class Posts extends Component<PostsProps> {
  state = {
    currentPage: 1,
    postsPerPage: 6,
    posts: this.props.posts
  };

  componentDidMount() {
    this.props.getPosts();
  }

  decrementPage = () => {
    const currentPage = this.state.currentPage - 1;
    if (currentPage > 0) {
      this.setState({
        currentPage
      });
    }
  };

  incrementPage = () => {
    const currentPage = this.state.currentPage + 1;
    if (currentPage < this.props.posts.length / this.state.postsPerPage) {
      this.setState({
        currentPage
      });
    }
  };

  moreHandler = () => {
    const postsPerPage = this.state.postsPerPage + 6;

    this.setState({
      postsPerPage
    });
  };

  render() {
    const { posts } = this.props;
    const styles: React.CSSProperties = {
      textDecoration: 'none',
      height: '100%'
    };

    const { currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const pageNumber = [];
    const curerntPost = posts.slice(indexOfFirstPost, indexOfLastPost);

    for (
      let i = 1;
      i <= Math.ceil(posts.length / this.state.postsPerPage);
      i++
    ) {
      pageNumber.push(i);
    }

    return (
      <Grid container spacing={4} alignItems="stretch">
        {this.state.posts.length >= 0
          ? curerntPost.map(post => (
              <Grid item xs={4} key={post.id}>
                <Link to={`/posts/${post.id}`} style={styles}>
                  <Post title={post.title} body={post.body} />
                </Link>
              </Grid>
            ))
          : '...Loading'}
        <Box component="section" display="flex" style={{ margin: '15px' }}>
          <Button
            onClick={this.decrementPage}
            className="page-link"
            variant="contained"
            color="primary"
          >
            <FastRewind />
            <Typography component="p">Previous</Typography>
          </Button>
          <Paper
            style={{
              backgroundColor: '#3f51b5',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              margin: '0 10px'
            }}
          >
            <Typography component="p">
              DISPLAY PAGE {this.state.currentPage} OF {pageNumber.length}
            </Typography>
          </Paper>
          <Button
            onClick={this.incrementPage}
            className="page-link"
            variant="contained"
            color="primary"
          >
            <Typography component="p">Next</Typography>
            <FastForward />
          </Button>
        </Box>
      </Grid>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.post.posts
  };
};

const mapDispatchToProps = (dispatch: PostsActionsThunkDispatch) => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
