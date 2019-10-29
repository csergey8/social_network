import { createStore, combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogReducer from './reducers/dialogReducer';
import sidebarReducer from './reducers/sidebarReducer';
import usersReducer from './reducers/usersReducer'

let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer,
  usersReducer
});

let store = createStore(reducers);

export default store;