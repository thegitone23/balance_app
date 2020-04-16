import React from "react";
import {connect} from "react-redux"
import {verifyUser, correctEmail} from "../helpers"
import TransactionView from "./TransactionView";
import {ToggleLogAction} from "./actions"
import {firebaseDB} from "../firebase"

class PublicProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foreignUser : undefined,
    }
  }

  componentDidMount() {
    (async () => {
      let testUser = undefined
      if(this.props.userKey)
        testUser = await verifyUser(this.props.userKey);
      if(testUser && testUser.exists())
      {
        this.setState({foreignUser : testUser.val()})
      }
      else
      {
        this.setState({foreignUser : undefined})
      }
    })()

  }

  
  render() {
    if(this.props.authenticated)
    {
      if(this.state.foreignUser) 
      {
        firebaseDB.ref(`users/${correctEmail(this.props.email)}/preferences/contacts/${this.props.userKey}`).set(this.state.foreignUser)
        return (
          <div>
            <h2> Welcome To The Profile Of {this.state.foreignUser} </h2>
            

            <button className="btn btn-outline-success" onClick={this.props.ToggleLog}> {this.props.logPayment ? "Done For Now" : "Log A Payment"   } </button>

            {this.props.logPayment ? <TransactionView from={correctEmail(this.props.email)} to={this.props.userKey} receiverName={this.state.foreignUser} senderName={this.props.userName} /> : undefined}

          </div>
        )
      }
      else
      {
        return (
          <h1>Looking For This User ...</h1>
        )
      }
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

const mapDispatchToProps = (dispatch) => {
  return {
    ToggleLog : () => {
      dispatch(ToggleLogAction());
    }

  }
}

const mapStateToProps = (state) => {
  return {
    authenticated : state.NavbarReducer.authenticated,
    userName : state.NavbarReducer.userName,
    email : state.NavbarReducer.email,
    logPayment : state.HomeReducer.logPayment
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (PublicProfile);