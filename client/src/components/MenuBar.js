import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const MenuBar = () => {
  return (
    <div className="menubar">
      <div>
        <div className="tabs is-centered">
          <ul>
            <li className="is-active"><Link to="/home">Take Absent</Link></li>
            <li><Link to="/data-absent">Data Absent</Link></li>
            <li><Link to="/add-new-student">Add New Student</Link></li>
            <li><Link to="/new-absent">Add New Absent</Link></li>
            <li><Link to="/new-class">Create New Class</Link></li>
            <li><Link to="/data-student">Data Student</Link></li>
            <li><Link to="/my-profile">My Profile</Link></li>
            <li><Link to="/log-out">Log Out</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuBar
