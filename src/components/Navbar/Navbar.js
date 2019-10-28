import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav">
      <NavLink activeClassName="active" to="/profile">
        Profile
      </NavLink>
      <NavLink activeClassName="active" to="/dialogs">
        Dialogs
      </NavLink>
    </div>
  );
};

export default Navbar;