import { usersAPI } from '../../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'; 


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
const UsersReducer = (state = initialState, action) => {

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
            console.log(action.id)
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

export default UsersReducer;

export const followActionCreator = id => ({ type: FOLLOW, id })
export const unfollowActionCreator = id => ({ type: UNFOLLOW, id})
export const getUsersActionCreator = users => ({ type: GET_USERS, users })
export const setCurrentPageActionCreator = page => ({ type: SET_CURRENT_PAGE, page })
export const setTotalUsersCountActionCreator = count => ({ type: SET_TOTAL_USERS_COUNT, count })
export const toggleIsFetchingActionCreator = () => ({ type: TOGGLE_IS_FETCHING });
export const toggleFollowingProgressActionCreator = (id, isLoading) => ({ type: TOGGLE_FOLLOWING_PROGRESS, id, isLoading })

export const getUsersThunkCreator = (currentPage, pageSize) => dispatch => {
        dispatch(setCurrentPageActionCreator(currentPage));
        dispatch(toggleIsFetchingActionCreator())
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(getUsersActionCreator(data.items));
                dispatch(setTotalUsersCountActionCreator(data.totalCount));
                dispatch(toggleIsFetchingActionCreator());
            });
};

export const followThunk = id => dispatch => {
    dispatch(toggleFollowingProgressActionCreator(id, true))
        usersAPI.follow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(followActionCreator(id))
                }
                dispatch(toggleFollowingProgressActionCreator(id, false))
            })
}

export const unfollowThunk = id => dispatch => {
    dispatch(toggleFollowingProgressActionCreator(id, true))
        usersAPI.unfollow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(unfollowActionCreator(id))
                }
                dispatch(toggleFollowingProgressActionCreator(id, false))
            })
}

