import { usersAPI } from '../../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const initialState = {
     userId: null,
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
                isAuth: true
            }
       
        default:
            return state
    }
}

export const setAuthUserDataActionCreator = ({ id, email, login }) => ({ type: SET_AUTH_USER_DATA, data: {id, email, login}})

export const authThunk = () => dispatch => {
    usersAPI.auth()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setAuthUserDataActionCreator(data.data))
              }
        })
}

export default authReducer;