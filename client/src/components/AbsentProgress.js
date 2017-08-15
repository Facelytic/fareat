import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as AWS from 'aws-sdk'

import Header from './Header'
import MenuBar from './MenuBar'

AWS.config.update({region:'us-east-1'});
AWS.config.accessKeyId = process.env.accessKeyId
AWS.config.secretAccessKey = process.env.secretAccessKey

class AbsentProgress extends Component {
  constructor() {
    super()
    this.state = {
      allData: []
    }
  }
  render() {
    return (
      <div>
        {
          this.props.absentToCheck.hasOwnProperty('_id') ?
          <div>
            <Header></Header>
            <MenuBar></MenuBar>
            <div style={{backgroundColor: "#ECF0F1", width: "80%", margin: "auto", padding: "3%", minHeight: "90vh"}}>
              <div style={{width: "70%", margin: "auto", paddingTop: "20px", paddingBottom: "20px"}}>
                <p>{this.props.absentToCheck.class_name}</p>
                <p>{this.props.absentToCheck.subject}</p>
                <p>Pertemuan ke - {this.props.pertemuan}</p>
                <div className="columns" style={{backgroundColor: "#ff7070", borderRadius: "5px",
                  padding: "10px"}}>

                  <table className='table'>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.absentToCheck.student_list.map((student, idx) => {
                          // let hasil = this.prosesingCompareGo(this.props.imageToCompare, student)
                          this.prosesingCompareGo(this.props.imageToCompare, student)
                          let pertemuan = 'pertemuan_ '+this.props.pertemuan
                          return (
                          <tr key={idx}>
                            <td>{idx+1}.</td>
                            <th>{student.student_id.name}</th>
                            {
                              this.state.allData[idx] ?
                              <td>{this.state.allData[idx]}</td> :
                              <td><img id="loading-icon-add-new-student" src='https://www.shareicon.net/data/32x32/2015/06/30/62174_loading_32x32.png' alt="loading" /></td>
                            }
                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> :
            <Redirect to='/home'/>
        }
      </div>
    )
  }

  componentDidMount() {
    console.log("this.props.absentToCheck.hasOwnProperty('_id')", this.props.absentToCheck.hasOwnProperty('_id'));
    if (this.props.absentToCheck._id != undefined) {
      let self = this
      // this.props.absentToCheck.student_list.forEach( student => {
      //   this.prosesingCompareGo(this.props.imageToCompare, student)
      // })
      for (let i = self.state.allData.length; i<self.props.absentToCheck.student_list.length; i++) {
        console.log('self.props.absentToCheck.student_list[i]', self.props.absentToCheck.student_list[i]);
        // this.prosesingCompareGo(this.props.imageToCompare, this.props.absentToCheck.student_list[i])
      }
    }
  }

  prosesingCompareGo(image64, student) {
    console.log('student di processingcompareGo',student);
    var block = image64.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var binaryImg = atob(realData);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }
    let self = this

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });
    var rekognition = new AWS.Rekognition()
    let params = {
      SimilarityThreshold: 0,
      SourceImage: {
        Bytes: ab
      },
      TargetImage: {
       S3Object: {
        Bucket: "facelytic",
        Name: `student/${student.student_id.photo}`
       }
      }
     };
   return rekognition.compareFaces(params, function (err, data) {
     if (err) {
       console.log(err, err.stack)
     } // an error occurred
     else {
       console.log(student.student_id.photo, data); // successful response
       if (data.FaceMatches[0].Similarity < 80) {
         self.setState({
           allData: [...self.state.allData, "Gak Masuk"]
         })
       } else {
         self.setState({
           allData: [...self.state.allData, "Masuk"]
         })
       }

     }
   })
 }
}

const mapStateToProps = (state) => {
  return {
    absentToCheck: state.Flag.absentToCheck,
    imageToCompare: state.Flag.imageToCompare,
    pertemuan: state.Flag.pertemuan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbsentProgress)
