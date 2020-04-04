import React from "react"

const AuthButton = (props) => {
  if(props.status)
  {
    return <button className="btn btn-outline-success" onClick={props.signOut}>Sign Out</button>
  }
  else
  {
  return <button className="btn btn-outline-success" onClick={props.signIn}>Sign In</button>
  }
}

export default AuthButton;