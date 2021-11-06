import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
import axios from 'axios'

const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            

            // setUrl(url);
            // ApiCall();
            componentDidMount(url)
          });
      }
    );
  };


//  const ApiCall=()=> {
//    fetch("/fk",{
//      method:'POST',
//      headers:{
//        'Content-Type':'application/json',
//        'Accept': 'application/json'
//      },
//      body:JSON.stringify({'url':url})
     
//    }).then((result)=>{
//      result.json().then((resp)=>{
//        console.log("resp",resp)
//      })

//    })

const componentDidMount=(url)=> {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
  };
  fetch('/fk', requestOptions)
      // .then(response => console.log( response.json()))
      .then((result)=>{
             result.json().then((resp)=>{
               console.log("resp",resp.name)
               setUrl(resp.name)
             })
            })
}



  console.log("image: ", image);


  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
  );
};

render(<ReactFirebaseFileUpload />, document.querySelector("#root"));
