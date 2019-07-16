import { StateType, ActionType } from 'typesafe-actions';
import { match, RouteComponentProps } from 'react-router-dom';

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

export type PostsProps = {
  posts: PostType[];
  getPosts: () => void;
};

export interface PostProps extends RouteComponentProps<PostParams> {
  title: string;
  body: string;
}

interface PostParams {
  id: string;
}

export interface errorsType {
  userId?: string;
  title?: string;
  body?: string;
}
