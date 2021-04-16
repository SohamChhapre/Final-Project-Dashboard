import React,{useEffect,useState} from 'react'
import {BrowserRouter  as Router ,Route,Switch,Redirect,NavLink} from 'react-router-dom';
import Form from './Components/Form';
import Form2 from './Components/Form2';
import Sidebar from './Components/Sidebar';
import TextDash from './Components/Text/TextDash';
import VideoDash from './Components/Video/VideoDash';
import AudioDash from './Components/Audio/AudioDash';
import Login from './Components/Login/LoginForm';
import Register from './Components/Register/RegisterForm';
import Help from './Components/Help/Help';
import logout from './Assets/icons/logout.png';
import './App.css'
function App(props) {


    function setToken(userToken) {
      console.log("lol1");
      sessionStorage.setItem('token', JSON.stringify(userToken));
    }
    
    function getToken() {
      console.log("lol");
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken
    }
    useEffect(()=>{
      console.log("token",getToken())
      if(getToken() && getToken().email)
          {
            // setUsername(getToken().username);
            setAuth(true);
          }
      else
        setAuth(false);
      
    },[])
     const [isAuth,setAuth] = useState(false);
     
     useEffect(()=>
     {},
     [isAuth])
     const token = getToken();
     console.log(token);
  return (
    <Router>
    <div className="App">

    <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#9be0b8",padding:"10px 25px"}}>
      <a className="navbar-brand" href="/"><span style={{color:"forestgreen",fontSize:"22px"}}>Know Your Data</span></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarText">
        
        <ul className="navbar-nav mr-auto ">
          { isAuth &&
          <div className="activate-list">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Text </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/video">Video</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/audio">Audio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/help">Help</NavLink>
          </li>
          </div>
          }
        </ul>
        
        <span className="navbar-text">
        {isAuth==true && <span style={{color:"forestgreen",fontSize:"22px"}}><i>Hi, {getToken().username}</i>     <span style={{marginLeft:"10px"}} onClick={()=>{sessionStorage.clear();setAuth(false);}}><img src={logout} height="20px" /></span></span>}
        </span>
      </div>

    </nav>




      {/* <header style={{background:"#9be0b8",padding:"10px 25px"}}>
        <span style={{color:"forestgreen",fontSize:"22px"}}>Know Your Data</span>
        {isAuth==true && <span style={{color:"forestgreen",fontSize:"22px",position:"absolute",right:"90px",}}><i>Hi, {getToken().username}</i>     <span style={{marginLeft:"10px"}} onClick={()=>{sessionStorage.clear();setAuth(false);}}><img src={logout} height="20px" /></span></span>}
      </header> */}

        <switch>
        <Route exact path="/help">
          <Help/>
        </Route>
        {isAuth==true && <Route exact path="/login">
        <Redirect exact to="/" /> : <TextDash />
          </Route>
          }
        {isAuth==false && <Route  path="/">
        <Redirect exact to="/login" /> : <login />
          </Route>
          }

        {isAuth==false &&
        <Route exact path="/login">
          <Login setToken={setToken} setAuth={setAuth}/>
        </Route>
        }
        {isAuth==false &&
        <Route
        exact path='/register'
        render={(props) => <Register {...props}  />}
            />
        }

        {isAuth==true &&
        
        <Route exact path="/">
        <TextDash/>
        </Route>
      }
      {isAuth==true &&  <Route exact path="/video">
          <VideoDash/>
        </Route>
            }
          { isAuth==true &&
        <Route exact path="/audio">
          <AudioDash/>
        </Route>
          }
       

        </switch>
        </div>
        
    
    </Router>
  );
}

export default App;
