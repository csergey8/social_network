import { createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './reducers/profileReducer.ts';
import dialogReducer from './reducers/dialogReducer';
import sidebarReducer from './reducers/sidebarReducer';
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer.ts';
import appReducer from './reducers/appReducer.ts';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer,
  usersReducer,
  authReducer,
  appReducer,
  form: formReducer
});

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

let store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;