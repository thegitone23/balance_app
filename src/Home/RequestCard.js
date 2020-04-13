import React from "react"
import {firebaseDB} from "../firebase"

const handleRequest = (ref, accept) => {
  if(accept)
    firebaseDB.ref(`transactionRequests/${ref.key}/status`).set("ACCEPTED")
  else
    firebaseDB.ref(`transactionRequests/${ref.key}/status`).set("REJECTED")

}

const RequestCard = (props) => {
  let obj = props.data.val();


  if(props.type == "REJECTED")
  {
    if(obj.status == "REJECTED")
    {
      return (
      <div className="card">
        <h5>{obj.status}</h5>
        <h5>Sender : {obj.senderName}</h5>
        <h5>Receiver : {obj.receiverName}</h5>
        <h6>Sender Wanted To {obj.type}</h6>
        <h5>Amount : {obj.amount}</h5>
        <h6>Sender Key : {obj.requestSender}</h6>
        <h6>Receiver Key : {obj.requestReceiver}</h6>
        <h5>{obj.desc}</h5>
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
        <h5>{obj.status}</h5>
        <h5>Sender : {obj.senderName}</h5>
        <h5>Receiver : {obj.receiverName}</h5>
        <h6>Sender Wanted To {obj.type}</h6>
        <h5>Amount : {obj.amount}</h5>
        <h6>Sender Key : {obj.requestSender}</h6>
        <h6>Receiver Key : {obj.requestReceiver}</h6>

        <h5>{obj.desc}</h5>
      </div>
      );
    }
  }

  if(props.type == "PENDING_SENT")
    if(obj.requestSender == props.userKey && obj.status == "PENDING")
      return (
        <div className="card">
          <h5>{obj.status}</h5>
          <h6>Sender Wants To {obj.type}</h6>
          <h5>Amount : {obj.amount}</h5>
          <h5>Receiver : {obj.receiverName}</h5>
          <h6>Sender Key : {obj.requestSender}</h6>
          <h6> Receiverer Key : {obj.requeRerequestReceiverer}</h6>

          <h5>{obj.desc}</h5>
        </div>
      );
  if(props.type == "PENDING_RECEIVED")
    if(obj.requestReceiver == props.userKey && obj.status == "PENDING")
      return (
        <div className="card">
          <h5>{obj.status}</h5>
          <h6>Sender Wants To {obj.type}</h6>
          <h5>Amount : {obj.amount}</h5>
          <h5>Receiver : {obj.receiverName}</h5>
          <h6>Sender Key : {obj.requestSender}</h6>
          <h6>Receiverer Key : {obj.requeRerequestReceiverer}</h6>
          <h5>{obj.desc}</h5>
          <button className="btn btn-outline-success" onClick={() => handleRequest(props.data, true)}> Accept </button>
          <button className="btn btn-outline-danger" onClick={() => handleRequest(props.data, false)} > Decline </button>
        </div>
      );

  return null;


  // else
  //   return (
  //   <div className="card">
  //     <h5>{obj.status}</h5>
  //     <h5>Amount : {obj.amount}</h5>
  //     <h5>From : {obj.requestSender}</h5>
  //     <h5>{obj.desc}</h5>
  //   </div>
  //   );
}

export default RequestCard