import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Header from './Header'
// import Footer from './Footer'
import MenuBar from './MenuBar'
import { Redirect } from 'react-router-dom'

class InsertSubject extends Component {

  constructor() {
    super()
    this.state = {
      msg: "",
      newSubject: "",
      subjectList: []
    }
  }

  render() {
    return (
      <div>
        {
          this.props.currUser.hasOwnProperty('_id') ?
          <Redirect to='/' /> :
          null
        }
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
      axios.post('http://server-dev.ap-southeast-1.elasticbeanstalk.com/api/subjectList', {
        name: this.state.newSubject,
        user_id: this.props.currUser._id
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
    axios.get('http://server-dev.ap-southeast-1.elasticbeanstalk.com/api/subjectList/user/'+this.props.currUser._id)
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
    if (this.props.currUser.hasOwnProperty('_id')) {
      this.getSubjectListCurrUser()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.IS_LOGIN.currUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertSubject)
