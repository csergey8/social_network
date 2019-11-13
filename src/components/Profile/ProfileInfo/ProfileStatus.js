import React from 'react'
import Profile from '../Profile'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditModeHandler = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditModeHandler = () => {
        this.setState({
            editMode: false
        })
        this.props.setUserStatus(this.state.status)
        
    }

    inputStatusHandler = e => {
        this.setState({
            status: e.target.value
        })
    } 

    render() {
        return (
            <div>
                {
                    !this.state.editMode ?
                    <span onClick={this.activateEditModeHandler}>{this.props.status || "No Status"}</span>
                    : <input autoFocus={true} onBlur={this.deactivateEditModeHandler} value={this.state.status} onChange={this.inputStatusHandler} />
                }
            </div>
        )
    }
}

export default ProfileStatus;
