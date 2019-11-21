import profileReducer from "./profileReducer";
import { addPostActionCreator, deletePostActionCreator } from './profileReducer';

const state = {
  posts: [
    {id: 1, message: 'Sup', likesCount: 10},
    {id: 2, message: 'Hi', likesCount: 12},
    {id: 3, message: 'Yo', likesCount: 9}
   ]
}




it('new posts array length should be incremented', () => {
  const action = addPostActionCreator('some text');

  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
})

it('new post message and likesCount', () => { 
  const action = addPostActionCreator({post: 'some text'});
  
  const newState = profileReducer(state, action);

  expect(newState.posts[3].message).toBe('some text');
  expect(newState.posts[3].likesCount).toBe(0);
})

it('delete - posts array length should be decremented', () => {
  const action = deletePostActionCreator(1)

  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
})

