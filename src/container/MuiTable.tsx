import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PostType } from '../myTypes';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface MuiTableType {
  posts: PostType[];
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

const MuiTable: React.FC<MuiTableType> = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map(post => (
            <TableRow key={post.id}>
              <TableCell>{post.userId}</TableCell>
              <TableCell align="left">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </TableCell>
              <TableCell align="left">{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MuiTable;
