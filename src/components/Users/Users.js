import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Users.module.css';
import Paginator from './Paginator';

const Users = props => {
    return (
        <div>
            <div>
                <Paginator {...props}/>
            </div>
            {
                props.users.map(user => {
                return (
                    <div key={user.id} style={{ display: 'flex' }}>
                        <span>
                            <Link to={`/profile/${user.id}`}>
                                <div>
                                    <img src={user.photos.small ? user.photos.small : "http://zornet.ru/_fr/19/1457300.png" } style={{ width: '80px'}}/>
                                </div>
                            </Link>
                            {
                                user.followed
                                ? <button disabled={props.followingInProgress.some(id => id === user.id )} onClick={() => props.unfollow(user.id)}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === user.id )} onClick={() => props.follow(user.id)}>Follow</button>
                            }
                        </span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.city"}</div>
                            <div>{"user.location.country"}</div>
                        </span>
                    </div>
                )})
           }
        </div>
    )
}

export default Users;