import React from 'react';
import { PostProps } from '../../../MyTypes';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
  const classes = useStyles();

  return (
    <Card component="article" raised={true} className={classes.card}>
      <CardHeader title={props.title} component="h2" />
      <CardContent>
        <Typography paragraph>{props.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
