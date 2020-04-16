import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {correctEmail} from "../helpers";

const Welcome = (props) => {
  return (
    <div className="container">
      <h1>Welcome To The Balance App</h1>
      <p>This app is basically a balance manger. You can send requests to your friends for the amount they owe you and all that stuff</p>
      <footer>Created With &hearts; By thegitone23</footer>
      {props.authenticated ? <Redirect to={"/user/"+correctEmail(props.email)} /> : undefined}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated : state.NavbarReducer.authenticated,
    userName : state.NavbarReducer.userName,
    email : state.NavbarReducer.email
  };
}


export default connect(mapStateToProps,null)(Welcome);