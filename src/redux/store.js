import { createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogReducer from './reducers/dialogReducer';
import sidebarReducer from './reducers/sidebarReducer';
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer';
import ReduxThunk from 'redux-thunk';

let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer,
  usersReducer,
  authReducer
});

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

let store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;