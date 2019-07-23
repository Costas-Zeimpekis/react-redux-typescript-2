import { PostType, ErrorsType } from '../myTypes';

export const editPostValidation = (post: PostType, errorsObj: ErrorsType) => {
  if (String(post.userId) === '') {
    errorsObj['userId'] = 'UserId must be set';
  }

  if (isNaN(post.userId)) {
    errorsObj['userId'] = 'The userId must be a number';
  }

  if (post.title === '') {
    errorsObj['title'] = 'Title must be set';
  }
  if (post.title.length < 10) {
    errorsObj['title'] = 'The Title needs to be less then 10 charcters';
  }

  if (post.body === '') {
    errorsObj['body'] = 'Body must be set';
  }
  if (post.body.length < 20) {
    errorsObj['body'] = 'The Title needs to be less then 20 charcters';
  }
};
