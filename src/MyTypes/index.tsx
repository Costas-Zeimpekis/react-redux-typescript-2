import { StateType, ActionType } from 'typesafe-actions';

export type Store = StateType<typeof import('../index').default>;

export type RootAction = ActionType<
  typeof import('../container/store/actions')
>;

export type RootState = StateType<
  ReturnType<typeof import('../container/store/reducers').default>
>;

export type State = { posts: PostType[] };

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface ErrorsType {
  userId?: string;
  title?: string;
  body?: string;
}
