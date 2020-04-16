import React from "react"
import {firebaseDB} from "../firebase"

const CardHeader = (props) => {
  let obj = props.obj;
  return (
    <div>
      <h5>{obj.status}</h5>
      <h5>Sender : {obj.senderName} <small>({obj.requestSender})</small></h5>
      <h5>Receiver : {obj.receiverName} <small>({obj.requestReceiver})</small></h5>
      <h6>Sender Wants To {obj.type == "getPaid" ? "Get Paid" : "Pay"}</h6>
      <h5>Amount : {obj.amount}</h5>
      <h6>Descrpition : {obj.desc}</h6>
    </div>
  )
}

const handleRequest = (ref, msg) => {
  if(msg == "accept")
    firebaseDB.ref(`transactionRequests/${ref.key}/status`).set("ACCEPTED")
  else if(msg == "decline")
    firebaseDB.ref(`transactionRequests/${ref.key}/status`).set("REJECTED")
  else
    firebaseDB.ref(`transactionRequests/${ref.key}/status`).set("COMPLETED")

}

const RequestCard = (props) => {
  let obj = props.data.val();


  if(props.type == "REJECTED")
  {
    if(obj.status == "REJECTED")
    {
      return (
      <div className="card">
        <CardHeader obj={obj}/>
      </div>
      );
    }
  }


  if(props.type == "ACCEPTED")
  {
    if(obj.status == "ACCEPTED")
    {
      return (
      <div className="card">
        <CardHeader obj={obj}/>
        {(obj.requestReceiver == props.userKey && obj.type == "pay") || (obj.requestSender == props.userKey && obj.type == "getPaid") ? <button className="btn btn-outline-success" onClick={() => handleRequest(props.data, "mark")}> Mark As Completed </button> : undefined}
      </div>
      );
    }
  }

  if(props.type == "PENDING_SENT")
    if(obj.requestSender == props.userKey && obj.status == "PENDING")
      return (
        <div className="card">
          <CardHeader obj={obj}/>          
        </div>
      );
  if(props.type == "PENDING_RECEIVED")
    if(obj.requestReceiver == props.userKey && obj.status == "PENDING")
      return (
        <div className="card">
          <CardHeader obj={obj}/>
          <button className="btn btn-outline-success" onClick={() => handleRequest(props.data, "accept")}> Accept </button>
          <button className="btn btn-outline-danger" onClick={() => handleRequest(props.data, "decline")} > Decline </button>
        </div>
      );

  if(props.type == "COMPLETED")
    if(obj.status == "COMPLETED")
      return (
        <div className="card">
          <CardHeader obj={obj}/>          
        </div>
      );


  return null;
}

export default RequestCard