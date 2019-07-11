import { GET_POST } from '../constants';
import * as Types from '../../../MyTypes';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
// import { initialState } from '../../../index';

// const initialState: Types.initialState = {
//   posts: []
// };

const reducerPosts: any = (
  state: Types.RootState,
  action: Types.RootAction
) => {
  if (action.type === GET_POST) {
    return {
      ...state,
      posts: action.payload
    };
  }
  return state;
};

// const reducerPosts = createReducer(initialState).handleAction(
//   GET_POST,
//   (state: Types.RootState, action: Types.RootAction) => {
//     return action.payload;
//   }
// );

// export default combineReducers<Types.State, Types.RootAction>({
//   posts: reducerPosts
// });

export default reducerPosts;
