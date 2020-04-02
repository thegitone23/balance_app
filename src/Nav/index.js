import React from "react"
import { firebase, googleAuth} from "../firebase";
import AuthButton from "./AuthButton";
import LoginStatus from "./LoginStatus";
import {SignedInAction, SignedOutAction} from "./actions";
import {connect} from "react-redux";


class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  handleStatus = () => {
    const user = firebase.auth().currentUser;
      if(user)
      {
        this.props.SignedIn(user.displayName,user.email);    
      }    
      else
        this.props.SignedOut();
  }

  componentDidMount()
  {
    firebase.auth().onAuthStateChanged((user) => {
      this.handleStatus();
    })
  }


  signIn = () => {
    firebase.auth().signInWithPopup(googleAuth);
    this.handleStatus();
  }

  signOut = () => {
    firebase.auth().signOut();
    this.handleStatus();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Balance</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <LoginStatus status={this.props.authenticated} userName={this.props.userName} />
            </li>

            <li className="nav-item">
              <AuthButton status={this.props.authenticated} signIn={this.signIn} signOut={this.signOut} />
            </li>
          </ul>
      </nav>      
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    authenticated : state.NavbarReducer.authenticated,
    userName : state.NavbarReducer.userName,
    email : state.NavbarReducer.email
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    SignedIn : (userName, email) => {
      dispatch(SignedInAction(userName, email));
    },

    SignedOut : () => {
      dispatch(SignedOutAction());
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);