import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './Input.css'
import browse_icon from '../Assets/icons/browse.png';
const Text=()=>{
  const [file,setFile]=useState("");
  const [active,setActive]=useState(0);
  const [status,setStatus]=useState(0);
  useEffect(()=>{

  },[])
  useEffect(()=>{

  },[active])
  

  const uploadtocloud=async ()=>{
    const form = new FormData();
    form.append('file',this.uploadInput.files[0]);
    form.append('upload_preset','ml_default');
    console.log(form);
    const options = {
      onUploadProgress:(ProgressEvent)=>{
        const {loaded,total}= ProgressEvent;
        let percent=Math.floor(loaded*100/total);
        // console.log(percent);
        this.setState({...this.state,uploadStatus:percent});
      }
    }
    const response=await Axios.post('https://api.cloudinary.com/v1_1/read-it/upload',form,options);
    // const response=await fetch('https://api.cloudinary.com/v1_1/read-it/image/upload',{method:'POST', body : form})
    this.setState({...this.state,status:'uploading'});
    console.log(response.data);
    return response;
}
  const handleUploadImage=async (ev) =>{
    ev.preventDefault();
    // const response=await this.uploadtocloud();

    // console.log(response);
    const data = new FormData();
    data.append('file', file);
    data.append('filename', file.name);
    const options = {
      onUploadProgress:(ProgressEvent)=>{
        const {loaded,total}= ProgressEvent;
        let percent=Math.floor(loaded*100/total);
        // console.log(percent);
        setStatus(percent);
      }
    }
    const res=await Axios.post('http://localhost:5000/upload',data,options);
    // fetch('http://localhost:5000/upload', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {

    //   response.json().then((body) => {
    //     console.log("inside json");
    //     // this.setState({ imageURL: `http://localhost:5000/${body.file}` });
    //   });
    // });
  }
  

  
    return (
      <>
      <div className="row mx-0 mb-3" >
      <div className="col-lg-4 col-md-4 col-sm-6"> 
      <h5 className="text-heading">
        <span style={{padding:"4px 70px",backgroundColor: active==0?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>setActive(0)}>Upload File</span>
      </h5>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6">
      <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:active==1?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>setActive(1)}>Url</span>
        </h5>
        
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
      <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:active==2?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>setActive(2)}>Text</span>
        </h5>
        </div>
      
      </div>
      <form onSubmit={handleUploadImage}>
        {/* <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div> */}
       

       {active===0 && <div> <label class="filelabel mx-auto">
        <img src={browse_icon} height="24px"/>
        <br/>
        <span class="title">
          Add File
        </span>
        <input  type="file" class="FileUpload1" id="FileInput" name="booking_attachment" onChange={(e)=>{setFile(e.target.files[0]);console.log(e.target.files)}} type="file"/>
        </label>

        <br />
        {file && file.name && <div style={{textAlign:"center"}}><span style={{padding:"3px 20px", backgroundColor:"lightgreen",borderRadius:"10px"}}>{file.name}</span></div>}
            <div style={{"alignContent":"center"}}>
            <div style={{width:"200px"}}>
          {status>0 && status<100 && <div style={{}}><Progress  type="" percent={status}   theme={
        {
          error: {
            symbol: status + '%',
            trailColor: 'pink',
            color: 'red'
          },
          default: {
            symbol: status + '%',
            trailColor: 'lightblue',
            color: 'blue'
          },
          active: {
            symbol: status + '%',
            trailColor: 'yellow',
            color: 'orange'
          },
          success: {
            symbol: status + '%',
            trailColor: 'lime',
            color: 'green'
          }
        }
      }/>
      </div>
      
      }
      </div>
      {status===100 && 
        <div style={{width:"15px"}}><Progress type="" percent={100} status="success" width="35px"/>uploaded</div> 
        }
            </div>
            
            </div>
        }
    {
      active==1 &&  <div className="mx-auto"  style={{width:"30vw"}}>
        <input class="form-control"/>
      </div>
    }

        {active==2 &&  <div class="mx-auto" style={{width:"50vw"}}>
  <textarea class="form-control" rows="5" id="comment"></textarea>
</div> }
      
          <div className="mt-5" >
              <button className="btn btn-primary " style={{position:"absolute",right:"100px"}}>Submit</button>
            </div>
      </form>
      </>
    );
  
}

export default Text;