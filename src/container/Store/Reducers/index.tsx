import { INIT_POSTS, ERROR_GET_POSTS } from '../constants';
import { PostType, RootAction } from '../../../myTypes';
import { PostActions, ErrorAction } from '../actions';
import { combineReducers } from 'redux';

interface PostState {
  posts: PostType[];
}

interface ErrorState {
  error: Error | '';
}

const initialState: PostState = {
  posts: []
};

const initialErrorState = {
  error: ''
};

const reducerPosts = (state: PostState = initialState, action: PostActions) => {
  switch (action.type) {
    case INIT_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    default:
      return state;
  }
};

const reducerErrorGetPosts = (
  state: any = initialErrorState,
  action: ErrorAction
) => {
  switch (action.type) {
    case ERROR_GET_POSTS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default combineReducers({
  posts: reducerPosts,
  error: reducerErrorGetPosts
});
