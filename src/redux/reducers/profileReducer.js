import { usersAPI } from '../../api/api';

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'GET_STATUS';
const SET_STATUS = 'SET_STATUS';

const initialState = {
  posts: [
    {id: 1, message: 'Sup', likesCount: 10},
    {id: 2, message: 'Hi', likesCount: 12},
    {id: 3, message: 'Yo', likesCount: 9}
   ],
  newPostText: "",
  profile: null,
  status: null
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: action.post.post,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ""
      }
  
    case SET_USER_PROFILE:

      return {
        ...state,
        profile: action.profile
      }
    case GET_STATUS:
      return {
          ...state,
          status: action.status
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }  
    default:
      return state;
  }
};

export const addPostActionCreator = post => ({type: ADD_POST, post });
export const setUserProfileActionCreator = data => ({ type: SET_USER_PROFILE, profile: data})
export const getStatusActionCreator = data => ({ type: GET_STATUS, status: data.data });
export const setStatusActionCreator = status => ({ type: SET_STATUS, status })


export const setUserProfileThunk = id => dispatch => {
  usersAPI.getUserProfile(id)
    .then(data => {
      dispatch(setUserProfileActionCreator(data))
    })
}

export const getStatusThunk = id => dispatch => {
  usersAPI.getStatus(id)
    .then(data => {
      dispatch(getStatusActionCreator(data))
    })
}

export const setStatusThunk = status => dispatch => {
  usersAPI.updateStatus(status)
    .then(res => {
      if(res.data.resultCode === 0){
        dispatch(setStatusActionCreator(status))
      }
    })
}


export default profileReducer;


