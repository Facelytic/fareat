import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'

class InsertClass extends Component {

  constructor() {
    super()
    this.state = {
      msg: "",
      newClassName: "",
      classList: []
    }
  }
  componentWillMount() {
    if (this.props.currUser._id !== undefined) {
      this.getClassListCurrUser()
    }
  }

  render() {
    return (
      this.props.currUser.hasOwnProperty('_id') ?
      <div>
        <Header></Header>
        <MenuBar></MenuBar>
        <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: 'auto', padding: "20px 0"}}>
          <div className="field">
            <p className="title is-3">Insert New Class</p>
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
      </div>:
      <Redirect to='/' />
    );
  }

  insertClassGoGo() {
    if (this.state.classList.indexOf(this.state.newClassName) === -1) {
      axios.post('https://erwar.id/api/classList', {
        name: this.state.newClassName,
        user_id: this.props.currUser._id
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
    axios.get('https://erwar.id/api/classList/user/'+this.props.currUser._id)
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
}

const mapStateToProps = (state) => {
  return {
    currUser: state.IS_LOGIN.currUser
  }
}

export default connect(mapStateToProps, null)(InsertClass)
