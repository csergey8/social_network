import React from 'react'

const Users = (props) => {
    return (
        <div>
            {
                props.users.map(user => (
                    <div key={user.id} style={{ display: 'flex' }}>
                        <span>
                            <div>
                                <img src={user.imgUrl} style={{ width: '80px'}}/>
                            </div>
                            {
                                user.subscribed ?
                                <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
                                :
                                <button onClick={() => props.follow(user.id)}>Follow</button>
                            }
                        </span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.city}</div>
                            <div>{user.location.country}</div>
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Users;
