import { usersAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

const initialState = {
     id: null,
     email: null,
     login: null,
     isAuth: false
}

const authReducer = (state = initialState, action) => {
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

export const setAuthUserDataActionCreator = ({ id, email, login, isAuth = true }) => ({ type: SET_AUTH_USER_DATA, data: {id, email, login }, isAuth })


export const authThunk = () => dispatch => {
    return usersAPI.auth()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setAuthUserDataActionCreator(data.data))
              }
        })
}

export const loginThunk = (email, password ,rememberMe = false) => dispatch => {
    usersAPI.login(email, password, rememberMe)
        .then(data => {
            if(data.data.resultCode === 0) {
                dispatch(authThunk());
            } else {
                let errorMsg = data.data.messages.length > 0 ? data.data.messages[0] : "Error"
                dispatch(stopSubmit("login", {_error: errorMsg }))
            }
        })
}

export const logoutThunk = () => dispatch => {
    usersAPI.logout()
        .then(data => {
            if(data.data.resultCode === 0) {
                dispatch(setAuthUserDataActionCreator({id: null, email: null, login: null, isAuth: false}))
            }
        })
}

export default authReducer;