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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "./register.css";
import {URL} from '../Config';

const Register=({history})=>{
    console.log("heyy history",history);
  const [file,setFile]=useState("");
  const [active,setActive]=useState(0);
  const [data,setData]=useState({"file":"","url":"","text":""})
  const [status,setStatus]=useState(0);
  const [processing,setProcessing]=useState(0);
  const [incoming,setIncoming]=useState({});
  const [loggedin,setLoggedin]=useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function validateForm() {
      return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      event.preventDefault();
      const dataF = new FormData();
      dataF.append('username',username);
      dataF.append('email', email);
      dataF.append('password',password);
      setProcessing(1);
      Axios.post(`${URL}/register`,dataF)
      .then((res)=>{
        console.log(res);
        // if(res.data.loggedin=='true')
        // {
        //   setLoggedin(1);
         
        // }
        history.push('/login')
      }).catch((err)=>{
        console.log(err);
      });
  
  }
  
    // fetch('http://localhost:5000/upload', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {

    //   response.json().then((body) => {
    //     console.log("inside json");
    //     // this.setState({ imageURL: `http://localhost:5000/${body.file}` });
    //   });
    // });
  
  

  
    return (
      <>
      <div className="row mx-0">
        {/* <Sidebar/> */}
      <div className="col-lg-11 col-md-6 col-sm-12" style={{}}>

      <div className="row mx-0 mb-3" >
      <div className="col-lg-4 col-md-4 col-sm-6"> 
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6"> 
      <div className="Login">
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="text">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Sign Up
        </Button>
        </div>
      </Form>
    </div>

    </div>
      </div>
      </div>
      </div>
      </>
    );
  
}

export default Register;