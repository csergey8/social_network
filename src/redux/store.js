import { createStore, combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogReducer from './reducers/dialogReducer';
import sidebarReducer from './reducers/sidebarReducer';

let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer
});

let store = createStore(reducers);

export default store;