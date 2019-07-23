import { PostType } from '../myTypes';

export const httpPost = (id: string, body: PostType) => {
  fetch(`https://jsonplaceholder.typicode.com/postsassa/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json text/plain, */*',
      'Content-type': 'application/jsonn'
    },
    body: JSON.stringify(body)
  });
};

export const httpGetPosts = async (url: string, callback: any) => {
  const res = await fetch(url);
  const data = await res.json();
  callback({ status: 'loaded', posts: data });
};

export const httpGetPost = async (id: string, callback: any) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  callback({ status: 'loaded', data });
};
