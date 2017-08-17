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
            <li><Link to="/home">Take Absent</Link></li>
            <li><Link to="/data-absent">Data Absent</Link></li>
            <li><Link to="/create-new-student">Add New Student</Link></li>
            <li><Link to="/create-new-absent">Add New Absent</Link></li>
            <li><Link to="/new-class">Create New Class</Link></li>
            <li><Link to="/data-student">Data Student</Link></li>
            <li>Log Out</li>
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
