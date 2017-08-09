import React from 'react'

const MenuBar = () => {
  return (
    <div className="menubar">
      <div>
        <div className="tabs is-centered">
          <ul>
            <li className="is-active"><a>Take Absent</a></li>
            <li><a>Data Absent</a></li>
            <li><a>Add New Student</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuBar
