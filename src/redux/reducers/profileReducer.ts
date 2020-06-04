import { usersAPI } from '../../api/api';
import { ProfileType, PostType, ContactsType, PhotosType } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InfernActionsTypes, BaseThunkType } from '../store';

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'GET_STATUS';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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

export const actions = {
  addPostActionCreator: (post: any) => ({type: ADD_POST, post } as const),
  setUserProfileActionCreator: (data: ProfileType) => ({ type: SET_USER_PROFILE, profile: data} as const),
  getStatusActionCreator: (data: any) => ({ type: GET_STATUS, status: data.data } as const),
  setStatusActionCreator: (status: string) => ({ type: SET_STATUS, status } as const),
  deletePostActionCreator: (id: number) => ({ type: DELETE_POST, id}) as const,
}

export type InitialStateType = typeof initialState;

type ActionsType = InfernActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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


export const setUserProfileThunk = (id: number): ThunkType => (dispatch) => {
  usersAPI.getUserProfile(id)
    .then(data => {
      dispatch(actions.setUserProfileActionCreator(data))
    })
}

export const getStatusThunk = (id: number): ThunkType => (dispatch) => {
  usersAPI.getStatus(id)
    .then(data => {
      dispatch(actions.getStatusActionCreator(data))
    })
}

export const setStatusThunk = (status: string): ThunkType => (dispatch) => {
  usersAPI.updateStatus(status)
    .then(res => {
      if(res.data.resultCode === 0){
        dispatch(actions.setStatusActionCreator(status))
      }
    })
}

export default profileReducer;


