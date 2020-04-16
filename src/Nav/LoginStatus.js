import React from "react"
import {Link} from "react-router-dom"

const LoginStatus = (props) => {
  if(props.status)
      return <span className="navbar-text"><Link to="/"> To {props.userName}'s Dashboard </Link></span>
  else
      return <span className="navbar-text">Login Using Your Google Account</span>
}

export default LoginStatus;