import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

interface ChildComponentProps extends RouteComponentProps {}

const Home: React.FC<ChildComponentProps> = ({ history }) => {
  const onBtnHandler = () => {
    history.push('/posts');
  };
  return (
    <Box component="section">
      <Typography component="h1">
        Hello Ioannis click to go to the Posts
      </Typography>
      <Button onClick={onBtnHandler} variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
};

export default Home;
