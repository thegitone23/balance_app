import React from "react"
import { firebase, googleAuth, firebaseDB} from "../firebase";
import AuthButton from "./AuthButton";
import LoginStatus from "./LoginStatus";
import {SignedInAction, SignedOutAction} from "./actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import UserSchema from "../Schema/UserSchema";
import {initializeUser} from "../helpers";



class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  handleStatus = () => {
    const user = firebase.auth().currentUser;
    
      if(user)
      {
        // create user's data if doesn't exist
        initializeUser(user, firebaseDB, UserSchema);
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
        <Link to="/" className="navbar-brand">Balance</Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <LoginStatus status={this.props.authenticated} userName={this.props.userName} />
            </li>

          </ul>

          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              {this.props.authenticated ? <Link to="/transactions"><button className="btn btn-outline-success">Transactions</button></Link> : undefined}
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