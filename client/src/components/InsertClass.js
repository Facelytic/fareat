import React, { Component } from 'react';
import axios from 'axios';


import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

export default class InsertClass extends Component {

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
      newClassName: "",
      classList: []
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="subtitle is-4">Insert New Class</p>
          </div>
          <div className="field">
            <p className="subtitle is-6" style={{color: this.state.msgColor}}>{this.state.msg}</p>
          </div>
          <div className='field columns' style={{width: '50%', margin: 'auto'}}>
            <div className='column'>
              <div>
                <label className='label'>Class' Name</label>
              </div>
              <div>
                <input className='input' placeholder="New Subject" value={this.state.newClassName} onChange={(e) => this.setState({newClassName: e.target.value})}/>
              </div>
            </div>
          </div>
          <p className='button is-danger' style={{width: '10%'}} onClick={() => this.insertClassGoGo()}>Insert</p>
        </div>
      </div>
    );
  }

  insertClassGoGo() {
    if (this.state.classList.indexOf(this.state.newClassName) === -1) {
      axios.post('http://localhost:3000/api/classList', {
        name: this.state.newClassName,
        user_id: this.state.currUser._id
      })
      .then(response => {
        this.setState({
          newClassName: "",
          msg: 'Create class success',
          msgColor: "#20e8b2"
        })
        this.getClassListCurrUser()
      })
    } else {
    this.setState({
      newClassName: "",
      msg: "Class name already exist",
      msgColor: "red"
    })
    }
  }


  getClassListCurrUser() {
    axios.get('http://localhost:3000/api/classList/user/'+this.state.currUser._id)
    .then(response => {
      this.setState({
        classList: response.data.map(x => x.name)
      })
    })
    .catch(err => {
      alert('ERROR')
      console.log(err);
    })
  }

  componentWillMount() {
    this.getClassListCurrUser()
  }
}
