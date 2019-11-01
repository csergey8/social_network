import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import axios from 'axios';
import { followActionCreator, unfollowActionCreator, getUsersActionCreator, setCurrentPageActionCreator, setTotalUsersCountActionCreator, toggleIsFetchingActionCreator} from '../../redux/reducers/usersReducer';
import Preloader from '../utils/Preloader';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching();
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currenPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.getUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount);
                this.props.toggleIsFetching();
            });
    }

    onPageChangeHandler = (p) => {
        this.props.toggleIsFetching();
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.getUsers(res.data.items);
                this.props.toggleIsFetching();
            });
    }

    render(){ 
        return (
            <div>
                { this.props.isFetching ? <Preloader /> :<Users {...this.props} onPageChangeHandler={this.onPageChangeHandler}/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching
})

const mapDispatchToProps = dispatch => ({
        follow: id => dispatch(followActionCreator(id)),
        unfollow: id => dispatch(unfollowActionCreator(id)),
        getUsers: users => dispatch(getUsersActionCreator(users)),
        setCurrentPage: page => dispatch(setCurrentPageActionCreator(page)),
        setTotalUsersCount: count => dispatch(setTotalUsersCountActionCreator(count)),
        toggleIsFetching: () => dispatch(toggleIsFetchingActionCreator())
})


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
