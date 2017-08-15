import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as AWS from 'aws-sdk'

import Header from './Header'
import MenuBar from './MenuBar'
import { updateRawData, saveResultAbsent, updateMoodData } from '../actions'

AWS.config.update({region:'us-east-1'});
AWS.config.accessKeyId = process.env.accessKeyId
AWS.config.secretAccessKey = process.env.secretAccessKey

class AbsentProgress extends Component {
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

                  <table className='table is-striped' style={{width: "100%"}}>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Absent</th>
                        <th>Mood</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                      </tr>
                      {
                        this.props.absentToCheck.student_list.map((student, idx) => {
                          // if (this.props.allData.length < 1) {
                          //   this.getMood()
                          // }
                          if (this.props.allData.length === idx) {
                            this.prosesingCompareGo(this.props.imageToCompare, student)
                          }
                          return (
                            <tr key={idx}>
                               <td>{idx+1}.</td>
                               <th>{student.student_id.name}</th>
                               {
                                 this.props.allData[idx] ?
                                  this.props.allData[idx].data === "Masuk" ?
                                   <td id={'absent-nya-'+idx}>{this.props.allData[idx].data}</td> :
                                   this.props.allData[idx].data === "Gak Masuk" ?
                                   <td>
                                     <div className='select is-fullwidth'>
                                       <select id={"absent-nya-" + idx} onChange={(e) => console.log(e.target.value)}>
                                         <option value='Alpha'>Alpha</option>
                                         <option value='Sakit'>Sakit</option>
                                         <option value='Ijin'>Ijin</option>
                                         <option value='Kesalahan Mesin'>Kesalahan Mesin</option>
                                       </select>
                                     </div>
                                   </td> :
                                  <td><img id="loading-icon-add-new-student" src='https://www.shareicon.net/data/32x32/2015/06/30/62174_loading_32x32.png' alt="loading" /></td> :
                                  <td><img id="loading-icon-add-new-student" src='https://www.shareicon.net/data/32x32/2015/06/30/62174_loading_32x32.png' alt="loading" /></td>
                               }
                               {
                                 this.props.allData[idx] ?
                                    this.props.allData[idx].data === "Masuk" ?
                                    this.props.moodData.find( x => {
                                      return x.BoundingBox.Width === this.props.allData[idx].BoundingBox.Width && x.BoundingBox.Height === this.props.allData[idx].BoundingBox.Height && x.BoundingBox.Left === this.props.allData[idx].BoundingBox.Left && x.BoundingBox.Top === this.props.allData[idx].BoundingBox.Top
                                    }) ?
                                    <td value={
                                      this.props.moodData.find( x => {
                                        return x.BoundingBox.Width === this.props.allData[idx].BoundingBox.Width && x.BoundingBox.Height === this.props.allData[idx].BoundingBox.Height && x.BoundingBox.Left === this.props.allData[idx].BoundingBox.Left && x.BoundingBox.Top === this.props.allData[idx].BoundingBox.Top
                                      }).Emotions[0].Type
                                    } id={'mood-nya-'+idx}>{
                                      this.props.moodData.find( x => {
                                        return x.BoundingBox.Width === this.props.allData[idx].BoundingBox.Width && x.BoundingBox.Height === this.props.allData[idx].BoundingBox.Height && x.BoundingBox.Left === this.props.allData[idx].BoundingBox.Left && x.BoundingBox.Top === this.props.allData[idx].BoundingBox.Top
                                      }).Emotions[0].Type
                                      // .map(x => {
                                      //   return x.Type
                                      // }).join(', ')
                                    }</td>:
                                  <td> </td>:
                                  <td> </td>:
                                  <td> loading.. </td>
                               }
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

                <br/>
                <div>
                  <p className="button is-danger" style={{padding: 10, width: '30%'}}
                    onClick={() => this.updateDatabase()}
                    // onClick={(e) => this.props.saveResultAbsent(this.props.allData)}
                  >
                    SAVE
                  </p>
                </div>
              </div>
            </div>
          </div> :
            <Redirect to='/home'/>
        }
      </div>
    )
  }

  updateDatabase() {
    let pertemuan = 'pertemuan_'+this.props.pertemuan
    this.props.absentToCheck.student_list.forEach( (student, idx) => {
      let studentToUpdate = {...student}
      studentToUpdate[pertemuan] = document.getElementById('absent-nya-'+idx).value || document.getElementById('mood-nya-'+idx).innerHTML || "Masuk"
      this.props.saveResultAbsent(studentToUpdate)
      console.log('studentToUpdate', studentToUpdate);
    })
  }

  componentWillMount() {

  }

  getMood() {
    var rekognition = new AWS.Rekognition()
    var block = this.props.imageToCompare.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var binaryImg = atob(realData);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    let self = this
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }
    let paramsSA = {
      Image: {
       Bytes: ab
     },
      Attributes: [
        'ALL'
        /* more items */
      ]
     };
    rekognition.detectFaces(paramsSA, function (errSA, dataSA) {
      if(errSA) {
        console.log(errSA, errSA.stack);
      } else {
        self.props.updateMoodData(dataSA.FaceDetails)
        console.log('Emotions: ', dataSA);
      }
    })
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
        S3Object: {
         Bucket: "facelytic",
         Name: `student/${student.student_id.photo}`
        }
      },
      TargetImage: {
       Bytes: ab
      }
     };
     rekognition.compareFaces(params, function (err, data) {
       if (err) {
         console.log(err, err.stack)
       } else {
        console.log(student.student_id.photo, data); // successful response
        if (data.FaceMatches[0].Similarity < 75) {
          self.props.updateRawData("Gak Masuk")
        } else {
          self.props.updateRawData("Masuk", data.FaceMatches[0].Face.BoundingBox)
          let paramsSA = {
            Image: {
             Bytes: ab
           },
            Attributes: [
              'ALL'
              /* more items */
            ]
           };
          rekognition.detectFaces(paramsSA, function (errSA, dataSA) {
            if(err) {
              console.log(errSA, errSA.stack);
            } else {
              self.props.updateMoodData(dataSA.FaceDetails)
              console.log('Emotions: ', dataSA);
            }
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
    pertemuan: state.Flag.pertemuan,
    allData: state.Flag.rawResult,
    moodData: state.Flag.moodData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRawData: (data, obj) => dispatch(updateRawData(data, obj)),
    saveResultAbsent: (objAbsent) => dispatch(saveResultAbsent(objAbsent)),
    updateMoodData: (data) => dispatch(updateMoodData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbsentProgress)
