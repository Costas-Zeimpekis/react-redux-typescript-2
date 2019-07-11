import { StateType, ActionType } from 'typesafe-actions';

export type posts = { userId: number; id: number; title: string; body: string };

export type Posts = posts[];

export type Store = StateType<typeof import('../index').default>;
export type RootAction = ActionType<
  typeof import('../container/Store/actions')
>;
export type RootState = StateType<
  ReturnType<typeof import('../container/Store/Reducers').default>
>;

export type initialState = { posts: [] };

export type State = { posts: [] };
