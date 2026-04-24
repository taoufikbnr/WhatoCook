import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css'

const NotFound = () => (
  <div>
  <div class="not-found-container"  s>
        <img class="not-found-image" src="https://cloud.mongodb.com/static/images/sadface.gif"/>

        <div class="not-found-code">
            
                 status: 404, <br/>
                &nbsp;&nbsp;message: "Not Found" 
            
        </div>
    </div>
  
  
    <Link to="/">Go Home</Link>
</div>
);

export default NotFound;