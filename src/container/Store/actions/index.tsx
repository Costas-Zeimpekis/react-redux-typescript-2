import { INIT_POSTS } from '../constants';
import { Action, Dispatch } from 'redux';
import { PostType } from '../../..//MyTypes';
import { ThunkDispatch } from 'redux-thunk';

export interface PostActions extends Action {
  posts: PostType[];
}
export type PostsActionsThunkDispatch = ThunkDispatch<any, any, PostActions>;

export const getPosts = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    dispatch(initPosts(posts));
  };
};

export function initPosts(posts: PostType[]): PostActions {
  return { type: INIT_POSTS, posts };
}
