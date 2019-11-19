import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../Forms/FormsControl';
import { required } from '../../utils/validators';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginThunk, logoutThunk } from '../../redux/reducers/authReducer';
import style from '../Forms/FormsControl.module.css';

const LoginForm = props => {
    return ( 
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} name={"email"} component={Input} validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"}/>
                </div>
                <div>
                    <Field type="checkbox" name={"rememberMe"} component={Input} /> remember me
                </div>
                {
                    props.error ? <div className={style.formError}>{props.error}</div> : null
                }
                
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const Login = props => {
    const onSubmit = formData => {
        props.login(formData.email, formData.password, formData.rememberMe)
    } 
    if(props.isAuth) {
        return (
            <Redirect to="/profile" />
        )
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, rememberMe) => {
            dispatch(loginThunk(email, password, rememberMe))
        },
        logout: () => {
            dispatch(logoutThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
