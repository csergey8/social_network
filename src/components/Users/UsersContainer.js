import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Users from './Users';
import { getUsersThunkCreator, followThunk, unfollowThunk, setCurrentPageActionCreator, toggleFollowingProgressActionCreator} from '../../redux/reducers/usersReducer';
import Preloader from '../utils/Preloader';
import authRedirect from '../../hoc/authRedirect';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChangeHandler = p => {
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

const mapStateToProps = state => ({
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
})

const mapDispatchToProps = dispatch => ({
        follow: id => dispatch(followThunk(id)),
        unfollow: id => dispatch(unfollowThunk(id)),
        setCurrentPage: page => dispatch(setCurrentPageActionCreator(page)),
        toggleFollowingProgress: (id, isLoading) => dispatch(toggleFollowingProgressActionCreator(id, isLoading)),
        getUsersThunk: (currentPage, pageSize) => dispatch(getUsersThunkCreator(currentPage, pageSize))
})


export default compose(authRedirect, connect(mapStateToProps, mapDispatchToProps))(UsersContainer);
