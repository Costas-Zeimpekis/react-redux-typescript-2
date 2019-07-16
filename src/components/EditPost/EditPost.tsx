import React, { useState, useEffect, useMemo } from 'react';
import { PostType, errorsType, EditPostProps } from '../../MyTypes';
import { Link } from 'react-router-dom';
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

const initialState = {
  userId: 0,
  id: 0,
  title: '',
  body: ''
};

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

const EditPost: React.FC<EditPostProps> = props => {
  const [post, setPost] = useState<PostType>(initialState);
  const match = props.match;
  const classes = useStyles();

  const fetchPost = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    setPost(data);
  };

  const putPost = (id: string, body: PostType) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json text/plain, */*',
        'Content-type': 'application/jsonn'
      },
      body: JSON.stringify(body)
    });
  };

  useEffect(() => {
    fetchPost(match.params.id);
  }, [match.params.id]);

  const onChangeHandler = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPost({ ...post, [name]: event.target.value });
    };
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    putPost(match.params.id, post);
  };

  const errors: errorsType = useMemo(() => {
    let errorsObj: errorsType = {};

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

    return errorsObj;
  }, [post]);

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
                disabled={!!Object.keys(errors).length}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditPost;
