import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Fetch_DataStudent, Fetch_DataStudent_Detail } from '../actions'
import Header from './Header'
import MenuBar from './MenuBar'

class DataStudent extends Component {
  constructor() {
    super()
    this.state = {
      dataStudentDetail: null
    }
  }
  componentWillMount() {
    let idUser = localStorage.getItem('id')
    if (idUser !== null || idUser !== undefined) {
      this.props.fetchClassListByIdUser(idUser)
      // this.props.fetchClassListByIdUser_Detail('Happy Fox',idUser)
    } else {
      console.log('data not found, coz user not found');
    }
  }
  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", minWidth: "fit-content", margin: "auto", padding: "3%", minHeight: "90vh"}}>
          <div style={{minWidth: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
            <p className="title">Data Student</p>
            <div className="columns" style={{backgroundColor: "#ff7070", borderRadius: "5px",
              padding: "10px", justifyContent: 'center'}}>
              <div className="column" style={{minWidth: "fit-content", maxWidth: "40%"}}>
                <table className="table is-striped" style={{width: "100%", border: "solid 1px #ECF0F1", borderRadius: "15px"}}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Class</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.dataStudent === undefined ?
                      <p>Loading...</p> :
                      this.props.dataStudent.map((classname, idx) => {
                        var x = classname.name
                        return (
                          <tr key={idx}>
                            <td>{idx+1}.</td>
                            <th>{classname.name}</th>
                            <td>
                              <span><a onClick={(classname, idUser) => this.props.fetchClassListByIdUser_Detail(x, localStorage.getItem('id'))}>Detail </a></span>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              {
                this.props.dataStudentDetail ?
                // <img id="loading-icon-add-new-student" src='https://www.shareicon.net/data/32x32/2015/06/30/62174_loading_32x32.png' alt="loading" /> :
                <div className="column is-8" style={{textAlign: "right", minWidth: "fit-content"}}>
                  <table className="table" style={{width: "100%", border: "solid 1px #ECF0F1", borderRadius: "15px"}}>
                    <thead>
                      <tr>
                        {/* <th colSpan='9' style={{textAlign: 'center'}}><p className="subtitle is-4">{this.state.absentDetail.subject} - {this.state.absentDetail.class_name}</p></th> */}
                      </tr>
                      <tr>
                        <th>No.</th>
                        <th>Student Name</th>
                        <th>Photo</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.dataStudentDetail.map((student, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx+1}.</td>
                            <td>{student.name}</td>
                            <td><img src={student.photo}/></td>
                            <td>{student.photo}</td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                  <p className="button is-danger" style={{minWidth: '100px', width: '17%'}} onClick={() => this.setState({absentDetail: ""})}>Hide Detail</p>
                </div>:null
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('DataAbsent.js : stateDataStudent: ', state.Flag.dataStudent);
  console.log('DataAbsent.js : stateDataStudent_detail: ', state.Flag.dataStudentDetail);
  return {
    dataStudent: state.Flag.dataStudent,
    dataStudentDetail: state.Flag.dataStudentDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClassListByIdUser: (id) => dispatch(Fetch_DataStudent(id)),
    fetchClassListByIdUser_Detail: (classname, id) => dispatch(Fetch_DataStudent_Detail(classname, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataStudent)
