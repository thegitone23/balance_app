import React from "react"

const LoginStatus = (props) => {
  if(props.status)
      return <span className="navbar-text">Logged In As {props.userName}</span>
  else
      return <span className="navbar-text">Login Using Your Google Account</span>
}

export default LoginStatus;