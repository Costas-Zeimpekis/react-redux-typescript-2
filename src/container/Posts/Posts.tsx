import React, { useState, useEffect } from 'react';
import { initPosts } from '../store/actions';
import { RootState, PostType } from '../../myTypes';
import { useSelector, useDispatch } from 'react-redux';
import { httpGetPosts } from '../../Helpers/http';
import MuiTable from '../MuiTable';
import { Grid, Button, Paper, Box, Typography } from '@material-ui/core';
import { FastRewind, FastForward } from '@material-ui/icons';

interface PostsProps {
  posts: PostType[];
}

interface getData {
  status: string;
  posts?: PostType[];
}

const Posts: React.FC<PostsProps> = () => {
  const [data, setData] = useState<getData>({ status: 'loading' });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    httpGetPosts('https://jsonplaceholder.typicode.com/posts', setData);
  }, []);

  useEffect(() => {
    if (data.posts) {
      dispatch(initPosts(data.posts));
    }
  }, [data.posts]);

  const reduxPosts = useSelector((state: RootState) => state.posts.posts);

  const decrementPage = () => {
    const currentPageNew = currentPage - 1;

    if (currentPage > 0) setCurrentPage(currentPageNew);
  };

  const incrementPage = () => {
    const currentPageIcrement = currentPage + 1;

    if (currentPageIcrement < reduxPosts.length / postsPerPage)
      setCurrentPage(currentPageIcrement);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const pageNumber = [];
  const curerntPost = reduxPosts.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(reduxPosts.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Grid container spacing={4} alignItems="stretch">
      {reduxPosts.length >= 0 && data.status === 'loaded' ? (
        <MuiTable posts={curerntPost} />
      ) : (
        ''
      )}

      <Box component="section" display="flex" style={{ margin: '15px' }}>
        <Button
          onClick={decrementPage}
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
            DISPLAY PAGE {currentPage} OF {pageNumber.length}
          </Typography>
        </Paper>
        <Button
          onClick={incrementPage}
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
};

export default Posts;
