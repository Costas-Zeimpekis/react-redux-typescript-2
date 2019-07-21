import React, { Fragment } from 'react';
import Home from './Home';
import Posts from '../container/Posts/Posts';
import EditPost from './EditPost/EditPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
      <Router>
        <CssBaseline>
          <Container maxWidth="lg" className={classes.root}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/posts" exact component={Posts} />
              <Route path="/posts/:id" component={EditPost} />
            </Switch>
          </Container>
        </CssBaseline>
      </Router>
    </Fragment>
  );
};

export default App;
