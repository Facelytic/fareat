import React from 'react'

import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import { takeAbsentSTATUS, addNewStudentSTATUS } from '../actions'

const MenuBar = (props) => {
  return (
    <div className="menubar" style={{backgroundColor: "white"}}>
      <div>
        <div className="tabs is-centered">
          <ul>
            <li className={props.takeAbsent}><Link to="/home" onClick={(e) => props.takeAbsentSTATUS('is-active')}>Take Absent</Link></li>
            <li className={props.statusMenuBar}><Link to="/data-absent" onClick={(e) => props.takeAbsentSTATUS('is-active')}>Data Absent</Link></li>
            <li className={props.addNewStudent}><Link to="/create-new-student" onClick={(e) => props.addNewStudentSTATUS('is-active')}>Add New Student</Link></li>
            <li className={props.statusMenuBar}><Link to="/create-new-absent">Add New Absent</Link></li>
            <li className={props.statusMenuBar}><Link to="/new-class">Create New Class</Link></li>
            <li className={props.statusMenuBar}><Link to="/data-student">Data Student</Link></li>
            <li className={props.statusMenuBar}><Link to="/my-profile">My Profile</Link></li>
            <li className={props.statusMenuBar}><Link to="/log-out" >Log Out</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    takeAbsent: state.Flag.takeAbsent,
    addNewStudent: state.Flag.addNewStudent

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    takeAbsentSTATUS: (isaktive) => dispatch(takeAbsentSTATUS(isaktive)),
    addNewStudentSTATUS: (isaktive) => dispatch(addNewStudentSTATUS(isaktive))
  }
}

// export default MenuBar
export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
