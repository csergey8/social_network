import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { Route, BrowserRouter } from "react-router-dom";
import { compose } from 'redux';
import {  } from "react-router";
import { authThunk } from './redux/reducers/authReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appInitThunk } from './redux/reducers/appReducer';
import "./App.css";
import Preloader from "./utils/Preloader";

class App extends React.Component {
  componentDidMount() {
    this.props.appInit();
  }
  render() {
    if(!this.props.init) {
      return (<Preloader />)
    } else {
      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="content">
            <Route path="/profile/:id?" render={() => <ProfileContainer />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
    );
  }
 }
    
}

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  init: state.appReducer.init
})

const mapDispatchToProps = dispatch => ({
  appInit: () => dispatch(appInitThunk())
})

export default compose(withRouter, (connect(mapStateToProps, mapDispatchToProps)))(App);
