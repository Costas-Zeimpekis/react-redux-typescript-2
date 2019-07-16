import { StateType, ActionType } from 'typesafe-actions';

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Store = StateType<typeof import('../index').default>;
export type RootAction = ActionType<
  typeof import('../container/Store/actions')
>;
export type RootState = StateType<
  ReturnType<typeof import('../container/Store/Reducers').default>
>;

export type State = { posts: PostType[] };
