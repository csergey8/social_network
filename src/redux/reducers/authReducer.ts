import { usersAPI, ResultCodeEnum } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../store';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

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

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionCreatorPayloadType = {
    id: number,
    email: string,
    login: string
}

type SetAuthUserDataActionCreatorType = {
    type: typeof SET_AUTH_USER_DATA
    data: SetAuthUserDataActionCreatorPayloadType
    isAuth: boolean
}

export const setAuthUserDataActionCreator = 
    ({ id , email, login, isAuth = true }: any): SetAuthUserDataActionCreatorType => ({ type: SET_AUTH_USER_DATA, data: {id, email, login }, isAuth })

type AuthActionCreatorType = SetAuthUserDataActionCreatorType 

export const authThunk = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionCreatorType> => async (dispatch) => {
    const res = await usersAPI.auth() 
    if(res.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserDataActionCreator(res.data))
    }
        
}

export const loginThunk = (email: string, password: string ,rememberMe = false) => (dispatch: any) => {
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

export const logoutThunk = (): ThunkAction<void, AppStateType, unknown, AuthActionCreatorType> =>(dispatch: any) => {
    usersAPI.logout()
        .then(data => {
            if(data.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserDataActionCreator({id: null, email: null, login: null, isAuth: false}))
            }
        })
}

export default authReducer;