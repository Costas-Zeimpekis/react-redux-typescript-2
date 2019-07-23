import React, { useState, useEffect, useMemo } from 'react';
import { PostType, ErrorsType } from '../../../myTypes';
import { RouteComponentProps } from 'react-router-dom';
import { httpPost, httpGetPost } from '../../../Helpers/http';
import { editPostValidation } from '../../../Helpers/editPostValidation';

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

interface EditPostProps extends RouteComponentProps<EditPostParams> {}

interface EditPostParams {
  id: string;
}

interface PostStateType {
  status: string;
  data: PostType;
}

const initialState = {
  status: 'loading',
  data: {
    id: 0,
    userId: 0,
    title: '',
    body: ''
  }
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
  const [post, setPost] = useState<PostStateType>(initialState);
  const classes = useStyles();
  const match = props.match;

  const putPost = (id: string, body: PostType) => {
    httpPost(id, body);
  };

  useEffect(() => {
    httpGetPost(match.params.id, setPost);
  }, [match.params.id]);

  const onChangeHandler = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPost({ ...post, [name]: event.target.value });
    };
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    putPost(match.params.id, post.data);
  };

  const errors: ErrorsType = useMemo(() => {
    let errorsObj: ErrorsType = {};
    if (post.status === 'loaded') {
      editPostValidation(post.data, errorsObj);
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
          <CardHeader title={post.data.title} component="h2" />
          <CardContent>
            <Typography paragraph>{post.data.body}</Typography>
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
                  value={post.data.userId}
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
                  value={post.data.title}
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
                  value={post.data.body}
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
