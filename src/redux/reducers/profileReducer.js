import { usersAPI } from '../../api/api';

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
  posts: [
    {id: 1, message: 'Sup', likesCount: 10},
    {id: 2, message: 'Hi', likesCount: 12},
    {id: 3, message: 'Yo', likesCount: 9}
   ],
  newPostText: "",
  profile: null
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ""
      }
    

    case UPDATE_NEW_POST_TEXT:
    
      return {
        ...state,
        newPostText: action.text
      }
    case SET_USER_PROFILE:

      return {
        ...state,
        profile: action.profile
      }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfileActionCreator = data => ({ type: SET_USER_PROFILE, profile: data})


export const setUserProfileThunk = id => dispatch => {
  usersAPI.getUserProfile(id)
    .then(data => {
      dispatch(setUserProfileActionCreator(data))
    })
}

export default profileReducer;
