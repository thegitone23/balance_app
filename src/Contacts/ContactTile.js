import React from "react"
import {Link} from "react-router-dom"
const ContactTile = (props) => {
  if(props.userKey) 
  {
    
    return (
    <div className="card">
      <li className="tile">
      <Link to={`/user/${props.userKey}`}>
        <h1>{props.userName}</h1>
        <h2>{props.userKey}</h2>
      </Link>
      </li>
    </div>
    );
  }
  return undefined;
};

export default ContactTile;