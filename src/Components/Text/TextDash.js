import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../Input.css'
import browse_icon from '../../Assets/icons/browse.png';
import Sidebar from '../Sidebar';
import GaugeChart from 'react-gauge-chart'
import { IgrLinearGauge } from 'igniteui-react-gauges';
import Chart from "react-google-charts";
import spinner from '../../Assets/icons/text_spinner.gif';
import save_icon from '../../Assets/icons/save.png';
import {URL} from '../Config';
import Switch from '@material-ui/core/Switch';



const TextDash=()=>{
  const [file,setFile]=useState("");
  const [active,setActive]=useState(0);
  const [data,setData]=useState({"file":"","url":"","text":""})
  const [status,setStatus]=useState(0);
  const [processing,setProcessing]=useState(0);
  const [incoming,setIncoming]=useState({});
  const [check_box,setCheckbox]=useState(0);
  const [errMessage,setErrMessage]=useState('');
  useEffect(()=>{
    setData({"file":"","url":"","text":""})
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
const downloadReport=()=> {
                
  //creating an invisible element
  var repData="Readability Analysis\n\n" + "Positive Score : " + incoming.readability["positive score"]+'\n'+
  "Negative Score : " + incoming.readability["negative score"]+"\n"+
  "Polarity : " + incoming.readability.polarity_ +"\n"+
  "Complex Percentage : "+incoming.readability.complex_percentage+"\n"+
  "Fog index : "+incoming.readability.fog_index_+'\n'+
  "Constraning Score : "+ incoming.readability.constraining_score_+"\n"+
  "Uncertainity Proportion : "+ incoming.readability.uncertainity_score_ +"\n"+
  "Positive Proportion : "+ incoming.readability.positive_proportion +"\n"+
  "Negative Proportion : "+ incoming.readability.negative_proportion+"\n"+
  "Constraning Proportion : "+ incoming.readability.constraining_proportion+"\n"+
  "Uncertainity Proportion : "+ incoming.readability.uncertainity_proportion+"\n\n\n"+
  "Summary:\n\n"+
  incoming.summary;  
  var element = document.createElement('a');
  element.setAttribute('href', 
  'data:text/plain;charset=utf-8, '
  + encodeURIComponent(repData));
  element.setAttribute('download', "Report.txt");

  // Above code is equivalent to
  // <a href="path of file" download="file name">

  document.body.appendChild(element);

  //onClick property
  element.click();

  document.body.removeChild(element);
}
  const downloadSummary=()=> {
                
    //creating an invisible element
    var element = document.createElement('a');
    element.setAttribute('href', 
    'data:text/plain;charset=utf-8, '
    + encodeURIComponent(incoming.summary));
    element.setAttribute('download', "summary.txt");

    // Above code is equivalent to
    // <a href="path of file" download="file name">

    document.body.appendChild(element);

    //onClick property
    element.click();

    document.body.removeChild(element);
  }
  const handleUploadImage=async (ev) =>{
    ev.preventDefault();
    // const response=await this.uploadtocloud();

    // console.log(response);
    // console.log(data);
    const dataF = new FormData();
    const condataset=[{data:[0.03945,0.04586,0.004523,0.004900],
      backgroundColor:["red","green","yellow","blue"]}];

    if(active==0)
    { 
      dataF.append('file', file);
      dataF.append('filename', file.name);
      dataF.append('url','');
      dataF.append('text','');
      dataF.append('scanned',check_box);
      console.log(dataF);
    }
    else if(active===1){
      dataF.append('file', '');
      dataF.append('filename', '');
      dataF.append('url',data.url);
      dataF.append('text','');
      dataF.append('scanned',check_box);
    }
    else{
      dataF.append('file', '');
      dataF.append('filename', '');
      dataF.append('url','');
      dataF.append('text',data.text);
      dataF.append('scanned',check_box);
    }
      const options = {
      onUploadProgress:(ProgressEvent)=>{
        const {loaded,total}= ProgressEvent;
        let percent=Math.floor(loaded*100/total);
        // console.log(percent);
        setStatus(percent);
      }
    }
    setProcessing(1);
    Axios.post(`${URL}/uploadText`,dataF,options)
    .then((res)=>{
      console.log(res);
      setStatus(0);
      setProcessing(2);
      console.log(incoming)
      setErrMessage(res.data.msg);
      setTimeout(()=>{
        setIncoming({...res.data});
        
      },3000)
      console.log(incoming);
      //setIncoming({...res.data})
      //console.log(incoming);
    }).catch((err)=>{
      console.log(err);
    });
    // fetch('http://localhost:5000/upload', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {

    //   response.json().then((body) => {
    //     console.log("inside json");
    //     // this.setState({ imageURL: `http://localhost:5000/${body.file}` });
    //   });
  }
    const handleChange=async (ev) =>{
      ev.preventDefault();
      if(check_box==0)
      {
        console.log("on");
        setCheckbox(1);
      }
      else
      {
        setCheckbox(0);
        console.log("off");
      }

    // });
  }
  

  
    return (
      <div>
      <div className="row mx-0">
        <Sidebar/>
      <div className="col-lg-11 col-md-11 col-sm-12" style={{height:"calc(100vh - 53px)" ,overflowY:"scroll"}}>

      <div className="row mx-0 mb-3" >
      <div className="col-lg-4 col-md-4 col-sm-6"> 
      <h5 className="text-heading">
        <span style={{padding:"4px 70px",backgroundColor: active==0?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>{setActive(0);setErrMessage("")}}>Upload File</span>
      </h5>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6">
      <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:active==1?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>{setActive(1);setErrMessage("")}}>Url</span>
        </h5>
        
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
      <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:active==2?"#fef4e3":"aliceblue",borderRadius:"30%",cursor:"pointer"}} onClick={()=>{setActive(2);setErrMessage("")}}>Text</span>
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
        <input  type="file" class="FileUpload1" id="FileInput" name="booking_attachment" onChange={(e)=>{setFile(e.target.files[0]);console.log(e.target.files);setErrMessage("")}} type="file"/>
        
        <br/>
        </label>
        <div class = "mx-auto title" style={{display: 'flex', justifyContent: 'center'}}>
        
        </div>
        <br />
        {file && file.name && <div style={{textAlign:"center"}}><span style={{padding:"3px 20px", backgroundColor:"lightgreen",borderRadius:"10px"}}>{file.name}</span></div>}
          <div className="text-center">
        <span class="title">
          Scanned File?
        </span>
        <Switch
          checked={check_box}
          onChange={handleChange}
          color="primary"
          name="scanned"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        /> 
        </div>
            
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
        <input class="form-control" type="text" placeholder="Enter URl" onChange={(e)=>{
          setData({...data,"url":e.target.value})
        }}/>
      </div>
    }

        {active==2 &&  <div class="mx-auto" style={{width:"50vw"}}>
  <textarea class="form-control" rows="5" id="comment" placeholder="Enter Text" onChange={(e)=>{
    setData({...data,"text":e.target.value})
  }}></textarea>
</div> }
      {errMessage && <div style={{color:"red",textAlign:"center",margin:"10px"}}>{errMessage}</div>}
          <div className="mt-5 mr-4" style={{textAlign:"end"}}>
              <button className="btn btn-primary " >Submit</button>
            </div>
      </form>
      { processing==1 && status==100 && <div class="mx-auto text-center">
        <img src={spinner} />
        <span style={{color:"aqua",fontSize:"32px"}}><i>Processing...</i></span>
        </div>}
        


      {  processing===2 &&  incoming && incoming.readability &&
        <div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-4 text-center" >
          
          <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Polarity Score</span>
        </h5>
        <div style={{backgroundColor:"silver"}}>
        <GaugeChart id="gauge-chart3" 
          nrOfLevels={30} 
          colors={["#FF0000", "#008000"]} 
          
          percent={(incoming.readability.polarity_+1)/2} 
        />
        </div>
    </div>
    <div className="col-lg-4 col-md-4 ">
    <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Fog Index</span> 
        </h5>
    <IgrLinearGauge
                    
                    transitionDuration={1000}
                    height="80px"
                    width="100%"
                    minimumValue={0}
                    maximumValue={100}
                    value={incoming.readability.fog_index_}
                    interval={10}
                    labelInterval={10}
                    labelExtent={0.0}

                    minorTickEndExtent={0.10}
                    minorTickStartExtent={0.20}
                    tickStartExtent={0.25}
                    tickEndExtent={0.05}
                    tickStrokeThickness={2}

                    needleShape="Needle"
                    needleBrush="#79797a"
                    needleOutline="#79797a"
                    scaleStrokeThickness={0}
                    scaleBrush="#ffffff"
                    scaleOutline="#d3d3d3"
                    backingBrush="#ffffff"
                    backingOutline="#d1d1d1"
                    backingStrokeThickness={0} 
                    
                    
                    
                    
                    />
                    <div className="mt-2" style={{color: "darkgoldenrod",textAlign: "center",fontSize: "14px"}}>
                      <div >
                      0-20 -Normal
                      </div>
                  <div >
                    20-25 - Business Document    
                      </div>
                      <div >
                        20-35 - Reports
                        </div>
                        <div >
                          35 and Above - Hard to read
                        </div>

                    </div>

    </div>
    <div className="col-lg-4 col-md-4 ">
    <h5 className="text-heading">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Uncertanity Score</span>< span style={{position:"absolute",right:"20px",top:"10px"}} onClick={downloadReport}><img src={save_icon} height="25px"/></span>
        </h5>
                  <div style={{"padding":"20px",fontSize:"22px",textAlign:"center"}}>{incoming.readability.uncertainity_score_}</div>
                    <div className="mt-2">
                      <div className="text-center" style={{color:"darkgoldenrod",fontSize:"15px"}}>
                      Lower the Score More will the clearity
                      </div>
                  

                    </div>

    </div>
    
    
    <div className="row mx-4 mt-4" >
            <div className="col-lg-4 col-md-4 text-center">
                <h5 className="text-heading ">
                      <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Distribution</span>
                    </h5>
                
                <Chart
                  width={'381px'}
                  height={'200px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Pizza', 'Popularity'],
                    ['Positive Proportion', incoming.readability.positive_proportion],
                    ['Negative Proportion', incoming.readability.negative_proportion],
                    ['Constraning Proportion', incoming.readability.constraning_proportion],
                    ['Uncertainity Proportion', incoming.readability.uncertainity_proportion]
                  ]}
                  options={{
                    title: 'Distribution of Text over different Index',
                    sliceVisibilityThreshold: 0.00001, 
                  }}
                  rootProps={{ 'data-testid': '7' }}
                />
            </div>
            <div className="col-lg-4 col-md-4 text-center">
                <h5 className="text-heading ">
                      <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer",display:"none"}} >Topic Modelling</span>
                    </h5>
                    <div className="mt-4">
                    <span style={{backgroundColor:"#f0f8ff",color:"black",padding:"10px 20px",borderRadius:"20px",cursor:"pointer"}} ><a href={incoming.topic_modelling[3]} target="_blank"> See Detailed Topic modelling </a></span> 
                  </div>
                    <br>
                    </br>
                    <div className="mt-4">
                    <span style={{backgroundColor:"#9be0b8",cursor:"pointer",color:"white",padding:"9px 36px",borderRadius:"20px"}} onClick={downloadReport}>Generate Overall Report</span>
                    </div>
                    <div></div>
            </div>
            <div className="col-lg-4 col-md-4 text-center">
                <h5 className="text-heading ">
                      <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Complex Word %</span>
                    </h5>
                     
                    <div style={{"fontSize":"26px"}}> {incoming.readability.complex_percentage*100}</div>
                    <div style={{"fontSize":"14px","color":"brown"}}>Complex Words are words which are made up of more than three syllables</div>
                    
            </div>

          </div>

    
    <div className="row mx-4 mb-4" >
      <div className="text-center">
    <h5 className="text-heading ">
          <span style={{padding:"4px 70px",backgroundColor:"beige",borderRadius:"30%",cursor:"pointer"}} >Summary</span>< span style={{position:"absolute",right:"30px"}} onClick={downloadSummary}><img src={save_icon} height="25px"/></span>
        </h5>
        </div>
      <div style={{backgroundColor:"palegoldenrod",padding:"15px",height:"230px",overflowY:"scroll"}}>
      {incoming.summary}
    </div>
    </div>
      </div>
      </div>
      }
                  

          


      </div> 
      </div>
      </div>
      
      
    );
  
}

export default TextDash;