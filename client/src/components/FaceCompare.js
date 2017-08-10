import React, { Component } from 'react'
var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});

class FaceCompare extends Component {
  constructor() {
    super()
    this.state = {
      face: null
    }
  }
  compareGo() {
    var params = {
      SimilarityThreshold: 90,
      SourceImage: {
        URL: 'https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F65025?alt=media&token=5afdf95d-a5f0-455a-a2cd-8d61480457b2'
      },
      TargetImage: {
        URL: 'https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F57028?alt=media&token=4a40fb2d-e704-4cb9-98f0-ccf8ad73d4b7'
      }
    };
    rekognition.compareFaces(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    })

  //       POST "https://rekognition.us-west-2.amazonaws.com/ HTTP/1.1"
  //   Host: rekognition.us-west-2.amazonaws.com
  //   Accept-Encoding: identity
  //   Content-Length: 170
  //   X-Amz-Target: RekognitionService.CompareFaces
  //   X-Amz-Date: 20170105T165437Z
  //   User-Agent: aws-cli/1.11.25 Python/2.7.9 Windows/8 botocore/1.4.82
  //   Content-Type: application/x-amz-json-1.1
  //   Authorization: AWS4-HMAC-SHA256 Credential=XXXXXXXX/20170105/us-west-2/rekognition/aws4_request,
  //    SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=XXXXXXXX
  // {
  //    "TargetImage":{
  //       "S3Object":{
  //          "Bucket":"example-photos",
  //          "Name":"family.jpg"
  //       }
  //    },
  //    "SourceImage":{
  //       "S3Object":{
  //          "Bucket":"example-photos",
  //          "Name":"people.jpg"
  //       }
  //    }
  }

  render() {
    return (
      <div>
        <a class="button" onClick={() => this.compareGo()}>

        </a>
      </div>
    )
  }
}

export default FaceCompare
