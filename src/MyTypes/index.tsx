import { StateType, ActionType } from 'typesafe-actions';
import { RouteComponentProps } from 'react-router-dom';

export type Store = StateType<typeof import('../index').default>;

export type RootAction = ActionType<
  typeof import('../container/store/actions')
>;

export type RootState = StateType<
  ReturnType<typeof import('../container/store/reducers').default>
>;

export type State = { posts: PostType[] };

export interface PostsProps {
  posts: PostType[];
  getPosts: () => void;
}

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface PostProps {
  title: string;
  body: string;
}

export interface EditPostProps extends RouteComponentProps<EditPostParams> {
  title: string;
  body: string;
}

interface EditPostParams {
  id: string;
}

export interface errorsType {
  userId?: string;
  title?: string;
  body?: string;
}
