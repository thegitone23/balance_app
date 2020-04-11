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
      requestsSent : []
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


  render() {
    if(this.props.authenticated)
    {
      return(
        <div className="container">
          {/* <h1>Requests Log</h1>
          <ul className="list-unstyled">
            {this.state.requests.map(i => {
              return(<li> <RequestCard data={i}/> </li> )
            })}
          </ul> */}
          <div className="row">

            <div className="col-md">
              <h3>Accepted Requests</h3>
              <ul className="list-unstyled">
                {[...this.state.requestsReceived, ...this.state.requestsSent].map(i => {
                  return(<li> <RequestCard data={i} type="ACCEPTED" userKey={correctEmail(this.props.email)}/> </li> )
                 })}
              </ul>
            </div>

            <div className="col-md">
              <h3>Rejected Requests </h3>
              <ul className="list-unstyled">
                {[...this.state.requestsReceived, ...this.state.requestsSent].map(i => {
                  return(<li> <RequestCard data={i} type="REJECTED" userKey={correctEmail(this.props.email)}/> </li> )
                 })}
              </ul>
            </div>

            <div className="col-md">

              <h3>Pending Requests You Sent</h3>
              <ul className="list-unstyled">
                {[...this.state.requestsReceived, ...this.state.requestsSent].map(i => {
                  return(<li> <RequestCard data={i} type="PENDING_SENT" userKey={correctEmail(this.props.email)}/> </li> )
                 })}
              </ul>
              
            </div>

            <div className="col-md">
            
              <h3>Pending Requests You Received</h3>
              <ul className="list-unstyled">
                {[...this.state.requestsReceived, ...this.state.requestsSent].map(i => {
                  return(<li> <RequestCard data={i} type="PENDING_RECV" userKey={correctEmail(this.props.email)}/> </li> )
                 })}
              </ul>

            </div>

          </div>

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