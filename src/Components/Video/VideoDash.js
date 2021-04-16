import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../Input.css'
import browse_icon from '../../Assets/icons/browse.png';
import Sidebar from '../Sidebar'
import Chart from "react-google-charts";
import spinner from '../../Assets/icons/col_spinner.gif';
import rot_spinner from '../../Assets/icons/tri_spinner.gif'
import {URL} from '../Config';

const VideoDash=()=>{
  const [file,setFile]=useState("");
  const [active,setActive]=useState(0);
  const [status,setStatus]=useState(0);
  const [reconstruction,setReconstruction]=useState([[]]);
  const [isResponse,setIsResponse]=useState(0);
  const [processing,setProcessing]=useState(0);
  const [errMessage,setErrMessage]=useState("");
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
    const response=await Axios.post('https://api.cloudinary.com/v1_1/read-it/uploader',form,options);
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
    setProcessing(1);
    Axios.post(`${URL}/uploadVideo`,data,options).then((res) => {
      console.log(res);
      if(res.data.flag)
      {
        setErrMessage(res.data.msg);
        setProcessing(2);
        setStatus(0);
      }
      else{
      console.log(res.data.reconstruction);
      setIsResponse(1);
      setReconstruction(res.data.reconstruction);
      setProcessing(2);
      }
    }).catch((err) => {
      console.log(err);
    });

      
  }
    
    
  
    
    return (
      <>
        <div className="row mx-0">
        <Sidebar/>
      <div className="col-lg-11 col-md-11 col-sm-12" style={{height:"calc(100vh - 53px)" ,overflowY:"scroll"}}>

      <div className="row mx-0 mb-3" >
      <div className="col-lg-12 col-md-12 col-sm-12"> 
      <h5 className="text-heading">
        <span style={{padding:"4px 70px",backgroundColor: active==0?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>setActive(0)}>Upload File</span>
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
        <input  type="file" class="FileUpload1" id="FileInput" name="booking_attachment" onChange={(e)=>{setFile(e.target.files[0]);setErrMessage("");console.log(e.target.files)}} type="file"/>
        </label>

        <br />
        {file && file.name && <div style={{textAlign:"center"}}><span style={{padding:"3px 20px", backgroundColor:"lightgreen",borderRadius:"10px"}}>{file.name}</span></div>}
        {errMessage && <div style={{color:"red",textAlign:"center",margin:"10px"}}>{errMessage}</div>}

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
   
      
          <div className="mt-5" >
              <button className="btn btn-primary " style={{position:"absolute",right:"100px"}}>Submit</button>
            </div>
      </form>

      { processing==1 && status==100 &&         <div class="mx-auto text-center mt-5 pt-5">
        <img src={rot_spinner} height="160px" />
        <span style={{color:"aqua",fontSize:"32px"}}><i>Processing...</i></span>
        </div>
        }

        {isResponse===1 &&
      <div className="row mt-5 pt-5">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center" >
          
          <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} > Video Anamoly </span>
        </h5>
        <div style={{backgroundColor:"black"}}>
          
            <Chart
                  width={'1200px'}
                  height={'400px'}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={reconstruction}
                  options={{
                    hAxis: {
                      title: 'Time',
                    },
                    vAxis: {
                      title: 'Anamoly',
                    },
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
        </div>
                  </div>
                  </div>}
      </div>
                
      </div>
      
                  
      </>
    );
  
}

export default VideoDash;