import React from "react";
import {connect} from "react-redux"
import {firebaseDB} from "../firebase"
import {correctEmail} from "../helpers"
import ContactTile from "./ContactTile"

class Contacts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacted : {}
    }

  }
  componentDidMount() {
    if(this.props.authenticated) {
      firebaseDB.ref(`users/${correctEmail(this.props.email)}/preferences/contacts`).once("value", (snap) => {
        if(snap.exists())
        {
          this.setState({contacted : snap.val()});
        }
      })

    }
  }

  render() {
    if(this.props.authenticated)
    {  
      let userKeys = [];
      let userNames = [];
      for(let key in this.state.contacted) {
        userKeys.push(key)
        userNames.push(this.state.contacted[key])
      }      
      return(
        <div className = "container">
          <ul className="list-unstyled">
            {userKeys.map((val, idx) => {

              return <ContactTile userKey={val} userName={userNames[idx]} />})
            }  
          </ul>
          <h6>x-- End Of The List --x</h6>

        </div>
      )
    }

    else
    {
      return(
        <div className="container">
          <h1>You May Wanna Login First</h1>
        </div>
      ) 
    }
  }

}

const mapStateToProps = (state) => {
  return {
    authenticated : state.NavbarReducer.authenticated,
    userName : state.NavbarReducer.userName,
    email : state.NavbarReducer.email
  };
}

export default connect(mapStateToProps, null) (Contacts);