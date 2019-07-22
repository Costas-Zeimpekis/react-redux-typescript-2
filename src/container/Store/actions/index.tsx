import { INIT_POSTS, ERROR_GET_POSTS } from '../constants';
import { Action, Dispatch } from 'redux';
import { PostType } from '../../../myTypes';
import { ThunkDispatch } from 'redux-thunk';

export interface PostActions extends Action {
  posts: PostType[];
}

export interface ErrorAction extends Action {
  error: Error;
}

export type PostsActionsThunkDispatch = ThunkDispatch<any, any, PostActions>;

export const getPosts = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    let posts;
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      posts = await res.json();
    } catch (error) {
      console.log('Error Action', error);
      dispatch(errorGetPosts(error));
    }

    dispatch(initPosts(posts));
  };
};

export function initPosts(posts: PostType[]): PostActions {
  return { type: INIT_POSTS, posts };
}

const errorGetPosts = (error: Error) => {
  return { type: ERROR_GET_POSTS, error };
};
