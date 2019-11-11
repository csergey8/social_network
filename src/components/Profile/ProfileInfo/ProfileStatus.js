import React from 'react'
import Profile from '../Profile'

class ProfileStatus extends React.Component {
    state = {
        editMode: true
    }

    editModeHandler = () => {
        debugger;
        this.setState({ editMode: !this.state.editMode })
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode ?
                    <span onClick={this.editModeHandler}>{this.props.status}</span>
                    : <input autoFocus={true} onBlur={this.editModeHandler} value={this.props.status}/>
                }
            </div>
        )
    }
}

export default ProfileStatus;
