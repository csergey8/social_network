import { authThunk } from './authReducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../store';

const APP_INIT = "APP_INIT";

export type InitialStateType = {
    init: boolean
}

type AppInitActionCreatorType = { type: typeof  APP_INIT }
 
const initialState: InitialStateType = {
    init: false
}

const appReducer = (state: InitialStateType = initialState, action: AppInitActionCreatorType): InitialStateType => {
    switch (action.type) {
        case APP_INIT:
            return {
                ...state,
                init: true
            }
            
    
        default:
            return state;
    }
}

export const appInitActionCreator  = (): AppInitActionCreatorType => ({ type: APP_INIT })

export const appInitThunk = (): ThunkAction<void, AppStateType, unknown, AppInitActionCreatorType> => (dispatch) => {
    dispatch(authThunk())
        .then(() => {
            dispatch(appInitActionCreator())
        })
}


export default appReducer;
