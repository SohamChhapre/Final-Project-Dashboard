import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css'
import video_icon from '../Assets/icons/video.png'
import audio_icon from '../Assets/icons/audio.png'
import text_icon from '../Assets/icons/text.png'
import help_icon from '../Assets/icons/help.png'
const Sidebar=()=>{
    return (
        <div className="col-lg-1 col-md-2 col-sm-12 sidebar-main " >

        <div className="sidebar-text" >

          <NavLink to="/">
            <li>
               <div className="bg-circle"> <img src={text_icon}/></div>
              Text
            </li>  
            </NavLink>
            <NavLink to="/video">

            <li>
            
               <div className="bg-circle"> <img src={video_icon} /> </div>
              Video
              
            </li>
            </NavLink>
            <NavLink to="/audio">
            <li>
                <div className="bg-circle"><img src={audio_icon}/></div>
              Audio
            </li>
            </NavLink>
            <li class="help-fixed">
                <div className="bg-circle" ><img src={help_icon}/></div>
              Help
            </li>
        </div> 
        </div>

    )
}

export default Sidebar;