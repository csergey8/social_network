import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Users from './Users';
import { getUsersThunkCreator, followThunk, unfollowThunk, setCurrentPageActionCreator, toggleFollowingProgressActionCreator, setPortionNumberActionCreator} from '../../redux/reducers/usersReducer';
import Preloader from '../../utils/Preloader';
import authRedirect from '../../hoc/authRedirect';
import { getUsers, getPageSize, totalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/reducers/usersSelectors';
import { UserType } from '../../redux/types';
import { AppStateType } from '../../redux/store';

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    users: Array<UserType>,
    totalItemsCount: number,
    followingInProgress: Array<number>,
    portionNumber: number,
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void,
    setCurrentPage: (p: number) => void,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    toggleFollowingProgress: (id: number, isLoading: boolean) => void,
    setPortionNumber: (num: number) => void
}

type OwnPropsType = {
    title?: string
}

type PropsTypes = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsTypes> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChangeHandler = (p: number) => {
        this.props.getUsersThunk(p , this.props.pageSize);
        this.props.setCurrentPage(p);
    }

    render(){ 
        return (
            <div>
                { this.props.isFetching ? <Preloader /> :<Users {...this.props} users={this.props.users} onPageChangeHandler={this.onPageChangeHandler}/>}
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: totalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionNumber: state.usersReducer.portionNumber
})


const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
        follow: (id: number) => dispatch(followThunk(id)),
        unfollow: (id: number) => dispatch(unfollowThunk(id)),
        setCurrentPage: (page: number) => dispatch(setCurrentPageActionCreator(page)),
        toggleFollowingProgress: (id: number, isLoading: boolean) => dispatch(toggleFollowingProgressActionCreator(id, isLoading)),
        getUsersThunk: (currentPage: number, pageSize: number) => dispatch(getUsersThunkCreator(currentPage, pageSize)),
        setPortionNumber: (num: number) => dispatch(setPortionNumberActionCreator(num))
})


export default compose(authRedirect, connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps))(UsersContainer);
