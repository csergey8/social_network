import { createSelector } from 'reselect';
import { AppStateType } from '../store';
import { UserType } from '../types';

export const getUsers = (state: AppStateType) => {
    return state.usersReducer.users
}

export const getUsersSuperSelector = createSelector(getUsers, (users) => {
    return users.filter((user: UserType) => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersReducer.pageSize
}

export const totalUsersCount = (state: AppStateType) => {
    return state.usersReducer.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersReducer.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersReducer.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersReducer.followingInProgress
}