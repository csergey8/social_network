import { authThunk } from './authReducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InfernActionsTypes, BaseThunkType } from '../store';

const APP_INIT = "APP_INIT";

export const actions = {
    appInit: () => ({ type: APP_INIT })
}

export type ActionsType = InfernActionsTypes<typeof actions>

export type InitialStateType = typeof initialState 

type ThunkType = BaseThunkType<ActionsType>

type AppInitActionCreatorType = { type: typeof APP_INIT }
 
const initialState = {
    init: false
}

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export const appInitThunk = (): ThunkType => (dispatch: any) => {
    dispatch(authThunk())
        .then(() => {
            dispatch(actions.appInit())
        })
}


export default appReducer;
