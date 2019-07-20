import { INIT_POSTS } from '../constants';
import { PostType } from '../../../myTypes';
import { PostActions } from '../actions';
import { combineReducers } from 'redux';

interface PostState {
  posts: PostType[];
}
const initialState: PostState = {
  posts: []
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

export default combineReducers({
  post: reducerPosts
});
