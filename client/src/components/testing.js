import React from 'react'
import AWS from 'aws-sdk'
AWS.config.update({region:'us-east-1'});
AWS.config.accessKeyId = "AKIAJPCQSW5RYCVRTRTA"
AWS.config.secretAccessKey = "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"
// import base64Image from 'base64-img'
class testing extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() =>  this.go()}
        >
          face compare
        </button>
      </div>
    )
  }
  async go(){
    var image64 = 'https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoSiswa%2F5bd9c2ef-4038-55e1-9467-60e174bd7c08?alt=media&token=022f528d-b4b1-46d1-9782-e24e1738ce59'
    // let bufferMan = new Buffer('https://firebasestorage.googleapis.com/v0/b/freat-7b322.appspot.com/o/fotoAbsen%2F57028?alt=media&token=4a40fb2d-e704-4cb9-98f0-ccf8ad73d4b7', 'base64')
    // console.log(bufferMan);
    console.log(image64);
    // var block = image64.split(";");
    // var contentType = block[0].split(":")[1];
    // var realData = block[1].split(",")[1];
    // var blob = await this.b64toBlob(realData, contentType)

      // var rekognition = new AWS.Rekognition()
      // let params = {
      //   SimilarityThreshold: 90,
      //   SourceImage: {
      //     Bytes: bufferMan
      //   },
      //   TargetImage: {
      //     Bytes: bufferMan
      //   }
      // }
      //
      // rekognition.compareFaces(params, function (err, data) {
      //   if (err) console.log(err, err.stack); // an error occurred
      //   else     console.log(data);           // successful response
      // });
  }

      b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

  //to base64 image
  base64(file, callback) {
    var coolFile = {};
    function readerOnload(e){
      var base64 = btoa(e.target.result);
      coolFile.base64 = base64;
      callback(coolFile)
    };

    var reader = new FileReader();
    reader.onload = readerOnload;

    var file = file[0].files[0];
    coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);

    //this below is how to use base64 function
    // base64( $('input[type="file"]'), function(data){
    //   console.log(data.base64)
    // })
  }
}

// this is for backend only
// fs.readFile(file, 'base64', (err, data) => {
//
//   // create a new base64 buffer out of the string passed to us by fs.readFile()
//   const buffer = new Buffer(data, 'base64');
//
//   var rekognition = new AWS.Rekognition()
//   let params = {
//     SimilarityThreshold: 90,
//     SourceImage: {
//       Bytes: buffer
//     },
//     TargetImage: {
//       Bytes: buffer
//     }
//   }
//
//   rekognition.compareFaces(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// })

export default testing
