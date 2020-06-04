import { usersAPI, ResultCodeEnum } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InfernActionsTypes, BaseThunkType } from '../store';
import { Action } from 'redux';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

export const actions = {
    setAuthUserDataActionCreator: 
    ({ id , email, login, isAuth = true }: any) => ({ type: SET_AUTH_USER_DATA, data: {id, email, login }, isAuth } as const), 
}

export type ActionsType = InfernActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

export type InitialStateType ={
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: InitialStateType = {
     id: null,
     email: null,
     login: null,
     isAuth: false,
     captchaUrl: null
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
       
        default:
            return state
    }
}

export const authThunk = (): ThunkType => async (dispatch) => {
    const res = await usersAPI.auth() 
    if(res.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserDataActionCreator(res.data))
    }
        
}

export const loginThunk = (email: string, password: string ,rememberMe = false): ThunkType => async (dispatch) => {
    usersAPI.login(email, password, rememberMe)
        .then(data => {
            if(data.data.resultCode === ResultCodeEnum.Success) {
                dispatch(authThunk());
            } else {
                let errorMsg = data.data.messages.length > 0 ? data.data.messages[0] : "Error"
                dispatch(stopSubmit("login", {_error: errorMsg }))
            }
        })
}

export const logoutThunk = (): ThunkType => async (dispatch) => {
    usersAPI.logout()
        .then(data => {
            if(data.data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setAuthUserDataActionCreator({id: null, email: null, login: null, isAuth: false}))
            }
        })
}

export default authReducer;