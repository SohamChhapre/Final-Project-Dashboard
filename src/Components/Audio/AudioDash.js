import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../Input.css'
import browse_icon from '../../Assets/icons/browse.png';
import Sidebar from '../Sidebar'
import Chart from "react-google-charts";
import rot_spinner from '../../Assets/icons/fast_spinner.gif'
import { stringCompare1 } from 'igniteui-react-core';
import {URL} from '../Config';

const AudioDash=()=>{
  const [file,setFile]=useState("");
  const [active,setActive]=useState(0);
  const [status,setStatus]=useState(0);
  const [isResponse,setIsResponse]=useState(0);
  const [processing,setProcessing]=useState(0);
  const [errMessage,setErrMessage]=useState("");
  const [intervals,setIntervals]=useState({"0":[[37.7,49.22]],"1":[[25.88,37.7]]});
  const [transcript,setTranscript]=useState({"0":["the end of the two weeks she grew tired of waiting and the day is so very long that I doing not without some so"],"1":["100 police traffic is going right and find the profit in jogging everything"]});
  const [chartdata,setChartdata]=useState([
    [
      { type: 'string', id: 'User' },
      { type: 'string', id: 'Transcript' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ],
    [
      'Magnolia Room',
      'Beginning JavaScript',
      0,
      15000,
    ],
    [
      'Magnolia Room',
      'Advanced JavaScript',30000,35000,
    ],
    [
      'Willow Room',
      'Advanced Google Charts',40000,45000,
    ],
  ])
  useEffect(()=>{
    setIntervals({"0":[[37.7,49.22]],"1":[[25.88,37.7]]});
    setTranscript({"0":["the end of the two weeks she grew tired of waiting and the day is so very long that I doing not without some so"],"1":["100 police traffic is going right and find the profit in jogging everything"]}) 
    setChartdata([
      [
        { type: 'string', id: 'User' },
        { type: 'string', id: 'Transcript' },
        { type: 'number', id: 'Start' },
        { type: 'number', id: 'End' },
      ],
      [
        'Magnolia Room',
        'Beginning JavaScript',
        0,
        15000,
      ],
      [
        'Magnolia Room',
        'Advanced JavaScript',30000,35000,
      ],
      [
        'Willow Room',
        'Advanced Google Charts',40000,45000,
      ],
    ])
    
    setTimeout(()=>{

    },5000);
  },[])
  useEffect(()=>{
    console.log("change in intrevals",intervals,transcript);
  },[intervals,transcript])
  useEffect(()=>{
    const tempdata=[[
      { type: 'string', id: 'User' },
      { type: 'string', id: 'Transcript' },
      { type: 'number', id: 'Start' },
      { type: 'number', id: 'End' },
    ]];
    console.log(transcript)
    console.log(intervals)
    for (var items in transcript){
      console.log(items,"items")
      for(var j=0;j<transcript[items].length;j++){
        tempdata.push(['speaker '+items,transcript[items][j],intervals[items][j][0]*1000,intervals[items][j][1]*1000])
      }
    }
    setChartdata(tempdata);
    setTimeout(()=>{},5000);

  },[processing])
  useEffect(()=>{

  },[chartdata])
  

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
    Axios.post(`${URL}/uploadAudio`,data,options).then((res) => {
      console.log(res);
      console.log(res.data);

      // const resdata=JSON.stringify(res.data)
      
      const resdata=res.data
      if(resdata.flag){
        setErrMessage(resdata.msg);
        setProcessing(2);
        setStatus(0);
      }
      else{
      const intervalarr=[]
      console.log(resdata);
      
      
      
      
      setTranscript({...resdata['list']})
      setIntervals({...resdata["intervals"]})
      setTimeout(()=>{
        // setIsResponse(1);
        // setProcessing(2);

        
        console.log(intervalarr)
      },2000)
      
      setIsResponse(1);
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
        <input  type="file" class="FileUpload1" id="FileInput" name="booking_attachment" onChange={(e)=>{setFile(e.target.files[0]);setErrMessage("");setStatus(0);console.log(e.target.files)}} type="file"/>
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
        <span style={{color:"aqua",fontSize:"26px"}}><i>Processing...</i></span>
        </div>
        }
  { isResponse==1 && processing==2 &&
      <div className="row mt-5 pt-5">
        <div className="col-lg-12 col-md-12 text-center" >
          
          <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} > Speaker Diarization </span>
        </h5>
        
        <Chart
              width={'100%'}
              height={'400px'}
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={chartdata}
              options={{
                timeline: {
                  colorByRowLabel: true,
                },
              }}
              rootProps={{ 'data-testid': '5' }}
            />
        
                  </div>
                  </div>
    }

            <div className="mt-5 pt-5">

            
            </div>

      </div>
      
      </div>
      
                  
      </>
    );
  
}

export default AudioDash;