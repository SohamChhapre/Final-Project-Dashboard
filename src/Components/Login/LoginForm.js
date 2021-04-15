import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
// import "./Login.css";
import {URL} from '../Config';

const Login=({setToken,setAuth})=>{
  //const [token,setToken]=useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function validateForm() {
      return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      event.preventDefault();
      const dataF = new FormData();

      dataF.append('email', email);
      dataF.append('password',password);
      
      Axios.post(`${URL}/login`,dataF)
      .then((res)=>{
        //console.log(res);
        if(res.data.loggedin=='true')
        {
          //console.log("lol");
          setToken({'email':email,'password':password,'username':res.data.username});
          setAuth(true);
        }
        
      }).catch((err)=>{
        console.log(err);
      });
  
  }
  
  

  
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
          Login
        </Button>
        <br></br>
        <Link exact to="/register"><Button block size="lg">
          Register
        </Button></Link>
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
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login;