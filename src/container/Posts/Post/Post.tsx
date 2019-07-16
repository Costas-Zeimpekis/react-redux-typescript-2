import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { PostType, RootState } from '../../../MyTypes';
import { match, Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
interface DetailParams {
  id: string;
}

interface PostProps {
  title: string;
  body: string;
  posts?: PostType[];
  match?: match<DetailParams>;
}

const initialState = {
  userId: 0,
  id: 0,
  title: '',
  body: ''
};

interface errorsType {
  userId?: string;
  title?: string;
  body?: string;
}

const useStyles = makeStyles({
  formControl: { width: '100%' },
  textField: {
    margin: '15px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between'
  },
  button: {
    margin: '20px 0'
  }
});

const Post: React.FC<PostProps> = props => {
  const [post, setPost] = useState<PostType>(initialState);
  const [disableBtn, setDisableBtn] = useState(true);
  const match = props.match;
  const classes = useStyles();

  const fetchPost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    setPost(data);
  };

  useEffect(() => {
    if (match) {
      fetchPost(match.params.id);
    }
  }, []);

  const onChangeHandler = (name: string) => {
    return (event: any) => {
      setPost({ ...post, [name]: event.target.value });
    };
  };

  const errors: errorsType | undefined = useMemo(() => {
    let errorsObj: errorsType | undefined = {};

    if (String(post.userId) === '') {
      errorsObj['userId'] = 'UserId must be set';
    }

    if (isNaN(post.userId)) {
      errorsObj['userId'] = 'The userId must be a number';
    }

    if (post.title === '') {
      errorsObj['title'] = 'Title must be set';
    }
    if (post.title.length < 10) {
      errorsObj['title'] = 'The Title needs to be less then 10 charcters';
    }

    if (post.body === '') {
      errorsObj['body'] = 'Body must be set';
    }
    if (post.body.length < 20) {
      errorsObj['body'] = 'The Title needs to be less then 20 charcters';
    }

    Object.getOwnPropertyNames(errorsObj).length === 0
      ? setDisableBtn(false)
      : setDisableBtn(true);

    return { ...errorsObj };
  }, [post]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (match)
      fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json text/plain, */*',
          'Content-type': 'application/jsonn'
        },
        body: JSON.stringify(post)
      })
        .then(res => res.json())
        .then(data => console.log(data));
  };

  if (match) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Link to={'/posts'}>
            <Button variant="contained" color="primary">
              Previous
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component="article" raised={true}>
            <CardHeader title={post.title} component="h2" />
            <CardContent>
              <Typography paragraph>{post.body}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component="article" raised={true}>
            <CardHeader title="Edit Form" component="h2" />
            <CardContent>
              <form onSubmit={submitHandler} noValidate={true}>
                <FormControl className={classes.formControl}>
                  <TextField
                    className={classes.textField}
                    label="userId"
                    type="text"
                    id="userID"
                    fullWidth
                    multiline
                    margin="normal"
                    value={post.userId}
                    onChange={onChangeHandler('userId')}
                    error={!!errors.userId}
                    helperText={!!errors.userId ? errors.userId : ''}
                    placeholder="Please set your userID"
                  />
                  <TextField
                    className={classes.textField}
                    label="Title"
                    type="text"
                    id="title"
                    fullWidth
                    multiline
                    value={post.title}
                    onChange={onChangeHandler('title')}
                    error={!!errors.title}
                    helperText={!!errors.title ? errors.title : ''}
                    placeholder="Please set your title"
                  />
                  <TextField
                    className={classes.textField}
                    label="Body"
                    type="text"
                    id="body"
                    fullWidth
                    multiline
                    value={post.body}
                    onChange={onChangeHandler('body')}
                    placeholder="Please set your body"
                    error={!!errors.body}
                    helperText={!!errors.body ? errors.body : ''}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={disableBtn}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Card component="article" raised={true} className={classes.card}>
      <CardHeader title={props.title} component="h2" />
      <CardContent>
        <Typography paragraph>{props.body}</Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.post.posts
  };
};

export default connect(mapStateToProps)(Post);
