import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const authRedirect = Component => {

    const RedirectComponent = props => {
        console.log(props);
        if(!props.isAuth) return <Redirect to="/login" />

        return <Component {...props} />
    }

    const mapStateToProps = state => {
        return {
            isAuth: state.authReducer.isAuth
        }
    }

    return connect(mapStateToProps)(RedirectComponent)
}

export default authRedirect;