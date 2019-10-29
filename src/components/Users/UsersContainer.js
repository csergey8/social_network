import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { followActionCreator, unfollowActionCreator, getUsersActionCreator} from '../../redux/reducers/usersReducer';

const mapStateToProps = state => {
    return {
        users: state.usersReducer.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        follow: id => {
            dispatch(followActionCreator(id))
        },
        unfollow: id => {
            dispatch(unfollowActionCreator(id))
        },
        getUsers: (users) => {
            dispatch(getUsersActionCreator(users))
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
