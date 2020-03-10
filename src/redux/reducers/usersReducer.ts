import { usersAPI } from '../../api/api';
import { ProfileType, PostType, ContactsType, PhotosType, UserType } from '../types';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'; 
const SET_PORTION_NUMBER  = 'SET_PORTION_NUMBER';



const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    status: null
}

type InitialStateType = typeof initialState

const UsersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.id){
                        return {...user, subscribed: true, followed: true}
                    }
                    return user
                })
            }
            
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.id){
                        return {...user, subscribed: false, followed: false}
                    }
                    return user
                })
            }
        case GET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_PORTION_NUMBER:
            return {
                ...state,
                portionNumber: action.num
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading ?
                [...state.followingInProgress, action.id]
                : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
        return state
            
    }
}

type FollowActionCreatorType = {
    type: typeof FOLLOW,
    id: number
}

type UnfollowActionCreatorType = {
    type: typeof UNFOLLOW,
    id: number
}

type GetUsersActionCreator = {
    type: typeof GET_USERS,
    users: Array<UserType>
}

type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}

type SetTotalUsersCountActionCreatorType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}

type ToggleIsFetchingActionCreatorType = {
    type: typeof TOGGLE_IS_FETCHING
}

type ToggleFollowingProgressActionCreatorType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    id: number,
    isLoading: boolean
}

type SetPortionNumberActionCreatorType = {
    type: typeof SET_PORTION_NUMBER,
    num: number
}

export const followActionCreator = (id: number): FollowActionCreatorType => ({ type: FOLLOW, id })
export const unfollowActionCreator = (id: number): UnfollowActionCreatorType => ({ type: UNFOLLOW, id})
export const getUsersActionCreator = (users: Array<UserType>): GetUsersActionCreator => ({ type: GET_USERS, users })
export const setCurrentPageActionCreator = (page: number): SetCurrentPageActionCreatorType => ({ type: SET_CURRENT_PAGE, page })
export const setTotalUsersCountActionCreator = (count: number): SetTotalUsersCountActionCreatorType => ({ type: SET_TOTAL_USERS_COUNT, count })
export const toggleIsFetchingActionCreator = (): ToggleIsFetchingActionCreatorType => ({ type: TOGGLE_IS_FETCHING });
export const toggleFollowingProgressActionCreator = (id: number, isLoading: boolean): ToggleFollowingProgressActionCreatorType => ({ type: TOGGLE_FOLLOWING_PROGRESS, id, isLoading })
export const setPortionNumberActionCreator = (num: number): SetPortionNumberActionCreatorType => ({ type: SET_PORTION_NUMBER, num})

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => (dispatch: any) => {
        dispatch(setCurrentPageActionCreator(currentPage));
        dispatch(toggleIsFetchingActionCreator())
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(getUsersActionCreator(data.items));
                dispatch(setTotalUsersCountActionCreator(data.totalCount));
                dispatch(toggleIsFetchingActionCreator());
            });
};

export const followThunk = (id: number) => (dispatch: any) => {
    dispatch(toggleFollowingProgressActionCreator(id, true))
        usersAPI.follow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(followActionCreator(id))
                }
                dispatch(toggleFollowingProgressActionCreator(id, false))
            })
}

export const unfollowThunk = (id: number) => (dispatch: any) => {
    dispatch(toggleFollowingProgressActionCreator(id, true))
        usersAPI.unfollow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(unfollowActionCreator(id))
                }
                dispatch(toggleFollowingProgressActionCreator(id, false))
            })
}


export default UsersReducer;