import React, { Fragment } from 'react';
import Home from './Home';
import Posts from '../container/Posts/Posts';
import Post from '../container/Posts/Post/Post';
import { BrowserRouter, Route } from 'react-router-dom';
import { makeStyles, Container, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '200px auto'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <BrowserRouter>
        <CssBaseline>
          <Container maxWidth="lg" className={classes.root}>
            <Route path="/" exact component={Home} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/posts/:id" component={Post} />
          </Container>
        </CssBaseline>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
