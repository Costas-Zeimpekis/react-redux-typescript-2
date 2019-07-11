import { action } from 'typesafe-actions';
import { GET_POST } from '../constants';
import * as Types from '../../..//MyTypes';
import { Dispatch } from 'redux';

export const getPosts = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    dispatch(setPosts(posts));
  };
};

export const setPosts = (posts: Types.posts[]) => action(GET_POST, posts);
