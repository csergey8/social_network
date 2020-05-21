import { usersAPI, ResultCodeEnum } from "../../api/api";
import {
  ProfileType,
  PostType,
  ContactsType,
  PhotosType,
  UserType,
} from "../types";
import { AppStateType, InfernActionsTypes } from "../store";
import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";
const SET_PORTION_NUMBER = "SET_PORTION_NUMBER";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  portionNumber: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  status: null,
};

type InitialStateType = typeof initialState;

type ActionsType = InfernActionsTypes<typeof actions>

export const actions = { 
    followActionCreator: (id: number) => ({ type: FOLLOW, id } as const),
    unfollowActionCreator: (id: number) => ({ type: UNFOLLOW, id } as const),
    getUsersActionCreator: (users: Array<UserType>) => ({ type: GET_USERS, users} as const),
    setCurrentPageActionCreator: (page: number) => ({type: SET_CURRENT_PAGE, page} as const),
    setTotalUsersCountActionCreator: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const),
    toggleIsFetchingActionCreator: () => ({ type: TOGGLE_IS_FETCHING }),
    toggleFollowingProgressActionCreator: (id: number,isLoading: boolean) => ({ type: TOGGLE_FOLLOWING_PROGRESS, id, isLoading} as const),
    setPortionNumberActionCreator: (num: number) => ({type: SET_PORTION_NUMBER, num} as const),
}

const UsersReducer = (state: InitialStateType = initialState, action: any ): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) {
            return { ...user, subscribed: true, followed: true };
          }
          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) {
            return { ...user, subscribed: false, followed: false };
          }
          return user;
        }),
      };
    case GET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_PORTION_NUMBER:
      return {
        ...state,
        portionNumber: action.num,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isLoading
          ? [...state.followingInProgress, action.id]
          : state.followingInProgress.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
};

type GetStateType = () => AppStateType;

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => (
  dispatch: Dispatch<ActionsType>,
  getState: GetStateType
) => {
  dispatch(actions.setCurrentPageActionCreator(currentPage));
  dispatch(actions.toggleIsFetchingActionCreator());
  usersAPI.getUsers(currentPage, pageSize).then((data) => {
    dispatch(actions.getUsersActionCreator(data.items));
    dispatch(actions.setTotalUsersCountActionCreator(data.totalCount));
    dispatch(actions.toggleIsFetchingActionCreator());
  });
};

export const followThunk = (
  id: number
): ThunkAction<void, AppStateType, unknown, ActionsType> => (
  dispatch,
  getState
) => {
  dispatch(actions.toggleFollowingProgressActionCreator(id, true));
  usersAPI.follow(id).then((data) => {
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.followActionCreator(id));
    }
    dispatch(actions.toggleFollowingProgressActionCreator(id, false));
  });
};

export const unfollowThunk = (
  id: number
): ThunkAction<void, AppStateType, unknown, ActionsType> => (dispatch) => {
  dispatch(actions.toggleFollowingProgressActionCreator(id, true));
  usersAPI.unfollow(id).then((data) => {
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.unfollowActionCreator(id));
    }
    dispatch(actions.toggleFollowingProgressActionCreator(id, false));
  });
};

export default UsersReducer;
