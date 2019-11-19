import React, { useState, useEffect } from 'react';
import Profile from '../Profile'


const ProfileStatusWithHooks = props => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditModeHandler = () => {
        setEditMode(true);
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false);
        props.setUserStatus(status)
        
    }

    const inputStatusHandler = e => {
       setStatus(e.target.value);
    } 

    return (
        <div>
            {
                !editMode ?
                <span onClick={activateEditModeHandler}>{props.status || "No Status"}</span>
                : <input autoFocus={true} onBlur={deactivateEditModeHandler} value={status} onChange={inputStatusHandler} />
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
