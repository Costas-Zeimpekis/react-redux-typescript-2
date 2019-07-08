import { StateType, ActionType } from 'typesafe-actions';

export type posts = { id: number; title: string };

export type RootAction = ActionType<
  typeof import('../container/Store/actions')
>;
export type RootState = StateType<
  typeof import('../container/Store/Reducers').default
>;

export type State = {
  readonly posts: posts;
};
