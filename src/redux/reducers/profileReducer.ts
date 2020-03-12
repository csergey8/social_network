import { usersAPI } from '../../api/api';
import { ProfileType, PostType, ContactsType, PhotosType } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../store';

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'GET_STATUS';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

// export type InitialStateType = {
//   posts: Array<PostType>
//   newPostText: string
//   profile: null | ProfileType 
//   status: null
// }

const initialState = {
  posts: [
    {id: 1, message: 'Sup', likesCount: 10},
    {id: 2, message: 'Hi', likesCount: 12},
    {id: 3, message: 'Yo', likesCount: 9}
   ] as Array<PostType>,
  newPostText: "",
  profile: null as ProfileType | null,
  status: ""
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
    case DELETE_POST: 
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST,
  post: PostType
}

type SetUserProfileActionCreatorType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

type SetStatusActionCreatorType = {
  type: typeof SET_STATUS,
  status: string
}

type DeletePostActionCreatorType = {
  type: typeof DELETE_POST,
  id: number
}

// type GetStatusActionCreator = {
//   type: typeof GET_STATUS,
//   status: {
//     data: any
//   }
// }

export const addPostActionCreator = (post: PostType): AddPostActionCreatorType => ({type: ADD_POST, post });
export const setUserProfileActionCreator = (data: ProfileType): SetUserProfileActionCreatorType => ({ type: SET_USER_PROFILE, profile: data})
export const getStatusActionCreator = (data: any) => ({ type: GET_STATUS, status: data.data });
export const setStatusActionCreator = (status: string): SetStatusActionCreatorType => ({ type: SET_STATUS, status })
export const deletePostActionCreator = (id: number): DeletePostActionCreatorType => ({ type: DELETE_POST, id})

type ProfileActionCreatorType = AddPostActionCreatorType | SetUserProfileActionCreatorType | SetStatusActionCreatorType | DeletePostActionCreatorType 

export const setUserProfileThunk = (id: number): ThunkAction<void, AppStateType, unknown, ProfileActionCreatorType> => (dispatch) => {
  usersAPI.getUserProfile(id)
    .then(data => {
      dispatch(setUserProfileActionCreator(data))
    })
}

export const getStatusThunk = (id: number) => (dispatch: any) => {
  usersAPI.getStatus(id)
    .then(data => {
      dispatch(getStatusActionCreator(data))
    })
}

export const setStatusThunk = (status: string): ThunkAction<void, AppStateType, unknown, ProfileActionCreatorType> => (dispatch) => {
  usersAPI.updateStatus(status)
    .then(res => {
      if(res.data.resultCode === 0){
        dispatch(setStatusActionCreator(status))
      }
    })
}


export default profileReducer;


