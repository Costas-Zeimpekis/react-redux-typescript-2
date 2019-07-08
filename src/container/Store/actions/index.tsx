import { action } from 'typesafe-actions';
import { GET_POST } from '../constants';

export const getPosts = () => action(GET_POST, { id: 1, title: 'Typescript' });

export const deletePosts = () => action('TEST');
