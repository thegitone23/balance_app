import React from "react";
import {connect} from "react-redux"
import {firebaseDB} from "../firebase"
import {correctEmail} from "../helpers"
import RequestCard from "./RequestCard"

class RequestsList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      requestsReceived : [],
      requestsSent : [],
      mode : "PENDING_RECIEVED",
      title : "Pending You Received",
    }
  }

componentDidMount() {

  // remeber to add index on requestReceiver
  firebaseDB.ref("transactionRequests").orderByChild("requestReceiver").equalTo(correctEmail(this.props.email)).on("value", (snap) => {
    let arr = []
    snap.forEach(item => {
      arr.push(item)
      return false
    })
    this.setState(pState => { return {...pState, requestsReceived : [...arr]} })
  })

  firebaseDB.ref("transactionRequests").orderByChild("requestSender").equalTo(correctEmail(this.props.email)).on("value", (snap) => {
    let arr = []
    snap.forEach(item => {
      arr.push(item)
      return false
    })
    this.setState(pState => { return {...pState, requestsSent : [...arr]} })
  })

}

componentWillUnmount() {
  firebaseDB.ref("transactionRequests").off();

}

  handleClick = (e) => {
    this.setState({mode : e.target.id, title : e.target.innerText});
  }


  render() {
    if(this.props.authenticated)
    {
      return(
        <div className="container">
          <h3>Transaction Requests</h3>
          <div className="row">

              <div className="col-md">
                <button className="btn btn-outline-success" id="PENDING_RECEIVED" onClick={this.handleClick} >Pending You Received</button>
              </div>  

              <div className="col-md">
                <button className="btn btn-outline-success" id="ACCEPTED" onClick={this.handleClick} >Accepted Requests</button>
              </div>  

              <div className="col-md">
                <button className="btn btn-outline-success" id="REJECTED" onClick={this.handleClick} >Rejected Requests</button>
              </div>  

              <div className="col-md">
                <button className="btn btn-outline-success" id="PENDING_SENT" onClick={this.handleClick} >Pending You Sent</button>
              </div>  
          </div>
          <hr /> 
          <br />
          <h2>{this.state.title}</h2>
            <ul className="list-unstyled" id="REQUEST_LIST">
              {[...this.state.requestsReceived, ...this.state.requestsSent].map(i => {
                return(<li> <RequestCard data={i} type={this.state.mode} userKey={correctEmail(this.props.email)}/> </li> )
                })}
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

export default connect(mapStateToProps, null) (RequestsList);