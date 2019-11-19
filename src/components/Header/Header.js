import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';


const Header = props => {
  return (
    <div className={classes.header}>
      <div>Header</div>
      <div>
      { 
        props.isAuth ? <div><div>{props.login}</div><button onClick={props.logout}>Logout</button></div> : <Link to="/login">Login</Link>
      }
      </div>
    </div>
  );
};



export default Header;