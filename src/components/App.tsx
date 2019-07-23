import React, { Fragment, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  makeStyles,
  Container,
  CssBaseline,
  CircularProgress
} from '@material-ui/core';

import ErrorBounry from './ErrorBoundry/ErrorBoundry';
import Home from './routes/Home/Home';
const Posts = lazy(() => import('../container/Posts/Posts'));
const EditPost = lazy(() => import('./routes/EditPost/EditPost'));

const useStyles = makeStyles({
  root: {
    margin: '200px auto'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline>
        <Container maxWidth="lg" className={classes.root}>
          <Router>
            <ErrorBounry>
              <Suspense fallback={<CircularProgress />}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/posts" exact component={Posts} />
                  <Route path="/posts/:id" component={EditPost} />
                </Switch>
              </Suspense>
            </ErrorBounry>
          </Router>
        </Container>
      </CssBaseline>
    </Fragment>
  );
};

export default App;
