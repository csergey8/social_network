import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.header}>
      <div>Header</div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Header;