import React from 'react';
import { Link } from 'react-router-dom';

const Users = props => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
        const pages = [];
        for(let i = 1; i <= pagesCount; i++){
            pages.push(i)
    }
    return (
        <div>
            <div>
                { pages.map(p => (
                    <span 
                    className={props.currenPage === p ? "" : " "}
                    onClick={() => props.onPageChangeHandler(p)}
                    >
                    {p}  </span>
                ))}
            </div>
            {
                props.users.map(user => (
                    <div key={user.id} style={{ display: 'flex' }}>
                        <span>
                            <Link to={`/profile/${user.id}`}>
                                <div>
                                    <img src={user.photos.small ? user.photos.small : "http://zornet.ru/_fr/19/1457300.png" } style={{ width: '80px'}}/>
                                </div>
                            </Link>
                            {
                                user.subscribed 
                                ? <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
                                : <button onClick={() => props.follow(user.id)}>Follow</button>
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
                ))
           }
        </div>
    )
}

export default Users;