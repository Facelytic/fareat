import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { deleteAbsent } from '../actions'
import Header from './Header'
import MenuBar from './MenuBar'

class DataAbsent extends Component {
  constructor() {
    super()
    this.state = {
      absentDetail: null
    }
  }
  render() {
    return (
      <div>
        {
          this.props.absentList.length > 0 ?
          <div>
            <Header></Header>
            <MenuBar></MenuBar>
            <div style={{backgroundColor: "#ECF0F1", minWidth: "fit-content", margin: "auto", padding: "3%", minHeight: "90vh"}}>
              <div style={{minWidth: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
                <p className="title">My Absent</p>
                <div className="columns" style={{backgroundColor: "#ff7070", borderRadius: "5px",
                  padding: "10px", justifyContent: 'center'}}>
                  <div className="column" style={{minWidth: "fit-content", maxWidth: "40%"}}>
                    <table className="table is-striped" style={{width: "100%", border: "solid 1px #ECF0F1", borderRadius: "15px"}}>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Subject</th>
                          <th>Class</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.absentList.length === 0 ?
                          <p>Loading...</p> :
                          this.props.absentList.map( (absent, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx+1}.</td>
                                <th>{absent.subject}</th>
                                <td>{absent.class_name}</td>
                                <td>
                                  <span><a onClick={() => this.setState({absentDetail: absent})}>Detail </a></span>
                                  <span><a onClick={() => {
                                    // if (confirm(`Are you sure want to delete absent for:\nClass: ${absent.class_name}\nSubject: ${absent.subject}`)) {
                                      this.props.deleteAbsent(absent._id)
                                    // }
                                  }
                                }> Delete</a></span>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  {
                    this.state.absentDetail ?
                    <div className="column is-8" style={{textAlign: "right", minWidth: "fit-content"}}>
                      <table className="table" style={{width: "100%", border: "solid 1px #ECF0F1", borderRadius: "15px"}}>
                        <thead>
                          <tr>
                            <th colSpan='9' style={{textAlign: 'center'}}><p className="subtitle is-4">{this.state.absentDetail.subject} - {this.state.absentDetail.class_name}</p></th>
                          </tr>
                          <tr>
                            <th>No.</th>
                            <th>Student Name</th>
                            <th>Meet 1</th>
                            <th>Meet 2</th>
                            <th>Meet 3</th>
                            <th>Meet 4</th>
                            <th>Meet 5</th>
                            <th>Meet 6</th>
                            <th>Meet 7</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.absentDetail.student_list.map( (student, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx+1}.</td>
                                <td>{student.student_id.name}</td>
                                <td>{student.pertemuan_1}</td>
                                <td>{student.pertemuan_2}</td>
                                <td>{student.pertemuan_3}</td>
                                <td>{student.pertemuan_4}</td>
                                <td>{student.pertemuan_5}</td>
                                <td>{student.pertemuan_6}</td>
                                <td>{student.pertemuan_7}</td>
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
          </div> :
          <Redirect to='/home' />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    absentList: state.Flag.absentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAbsent: (id) => {
      dispatch(deleteAbsent(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataAbsent)
