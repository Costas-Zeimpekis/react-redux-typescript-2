import { INIT_POSTS } from '../constants';
import { Action } from 'redux';
import { PostType } from '../../../myTypes';
import { ThunkDispatch } from 'redux-thunk';

export interface PostActions extends Action {
  posts: PostType[];
}

export interface ErrorAction extends Action {
  error: Error;
}

export type PostsActionsThunkDispatch = ThunkDispatch<any, any, PostActions>;

// export const getPosts = () => {
//   return async (dispatch: Dispatch): Promise<void> => {
//     try {
//       const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//       const posts = await res.json();
//       dispatch(initPosts(posts));
//     } catch (error) {
//       console.log('Error Action', error);
//       dispatch(errorGetPosts(error));
//     }
//   };
// };

export function initPosts(posts: PostType[]): PostActions {
  return { type: INIT_POSTS, posts };
}
