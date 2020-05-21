import { createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogReducer from './reducers/dialogReducer';
import sidebarReducer from './reducers/sidebarReducer';
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>


let reducers = combineReducers({
  profileReducer,
  dialogReducer,
  sidebarReducer,
  usersReducer,
  authReducer,
  appReducer,
  form: formReducer
});

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InfernActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>> 

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)

//@ts-ignore
let store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;