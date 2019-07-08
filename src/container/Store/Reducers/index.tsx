import { GET_POST } from '../constants';
import { RootState, posts } from '../../../MyTypes';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { ActionType } from 'typesafe-actions';

export type TodosAction = ActionType<typeof actions>;

export type TodosState = Readonly<{
  posts: posts;
}>;

const reducerPosts: any = (state: RootState, action: any) => {
  if (action.type === GET_POST) {
    console.log(action.payload);
    return {
      ...state,
      posts: action.payload
    };
  }
  return state;
};

export default combineReducers<TodosState, TodosAction>({
  posts: reducerPosts
});
