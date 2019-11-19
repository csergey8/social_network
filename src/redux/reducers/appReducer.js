import { authThunk } from './authReducer';

const APP_INIT = "APP_INIT";

const initialState = {
    init: false
}

const appReducer = (state = initialState, action) => {
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

export const appInitActionCreator = () => ({type: APP_INIT})

export const appInitThunk = () => dispatch => {
    dispatch(authThunk())
        .then(() => {
            dispatch(appInitActionCreator())
        })
}


export default appReducer;
