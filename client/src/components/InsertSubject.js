import React, { Component } from 'react';
import axios from 'axios';


import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

export default class InsertSubject extends Component {

  constructor() {
    super()
    this.state = {
      currUser: {
        "name": "Sidik Hidayatullah",
        "password": "$2a$10$t0zFGS2skAdRVQUV1/fl..ehk5dTRJLojPk1Yd5d87T0gyIuWzPie",
        "email": "sidik@guru.com",
        "_id": "598d57ef97ec530ceabb8cdb"
      },
      msg: "",
      newSubject: "",
      subjectList: []
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="subtitle is-4">Create New Subject</p>
          </div>
          <div className="field">
            <p className="subtitle is-6" style={{color: this.state.msgColor}}>{this.state.msg}</p>
          </div>
          <div className='field columns' style={{width: '50%', margin: 'auto'}}>
            <div className='column'>
              <div>
                <label className='label'>Subject's Name</label>
              </div>
              <div>
                <input className='input' placeholder="New Subject" value={this.state.newSubject} onChange={(e) => this.setState({newSubject: e.target.value})}/>
              </div>
            </div>
          </div>
          <p className='button is-danger' style={{width: '10%'}} onClick={() => this.insertClassGoGo()}>Create</p>
        </div>
      </div>
    );
  }

  insertClassGoGo() {
    if (this.state.subjectList.indexOf(this.state.newSubject) === -1) {
      axios.post('http://localhost:3000/api/subjectList', {
        name: this.state.newSubject,
        user_id: this.state.currUser._id
      })
      .then(response => {
        this.setState({
          newSubject: "",
          msg: 'Create subject success',
          msgColor: "#20e8b2"
        })
        this.getSubjectListCurrUser()
      })
    } else {
    this.setState({
      newSubject: "",
      msg: "Class name already exist",
      msgColor: "red"
    })
    }
  }


  getSubjectListCurrUser() {
    axios.get('http://localhost:3000/api/subjectList/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        subjectList: response.data.map(x => x.name)
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    this.getSubjectListCurrUser()
  }
}
