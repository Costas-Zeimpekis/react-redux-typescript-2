import { action } from 'typesafe-actions';
import { INIT_POSTS } from '../constants';
import * as Types from '../../..//MyTypes';
import { Dispatch } from 'redux';

export const getPosts = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    dispatch(initPosts(posts));
  };
};

export const initPosts = (posts: Types.posts[]) => action(INIT_POSTS, posts);
