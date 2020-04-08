import React from "react"
import {connect} from "react-redux"
import TransactionSchema from "../Schema/TransactionSchema"
import {transact} from "../helpers"
import {TransactionRequestAction} from "./actions"

class TransactionView extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      paymentType : "pay",
      amount : 0,
      desc : ""
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    let prop = event.target.id
    let val = event.target.value
    let obj = {}
    if(prop == "amount")
    {
      val = (isNaN(val) || val < 0) ? 0 : val
      val = Number(val) 
    }
    obj[prop] = val
    this.setState(obj);
  }

  handleTransaction = () => {
    let payload = {desc : this.state.desc, amount : this.state.amount, type : this.state.paymentType }
    let transcation = TransactionSchema(this.props.from, this.props.to, payload);
    transact(transcation);  
    this.props.TransactionRequest()  
  }

  render() {
    return(
      <div>
        <br />
        <form>
          <label for="paymentType">Payment Type </label>
          <select className="form-control" id="paymentType" value={this.state.paymentType} onChange={this.handleChange}>
            <option value="pay">I Got To Pay You</option>
            <option value="getPaid">You Got To Pay Me</option>
          </select>
          <br />
          <label for="amount">Amount</label>
          <input type="text" className="form-control" id="amount" value={this.state.amount} onChange={this.handleChange}></input>
          <br />
          <lable for="desc">Description</lable>
          <textarea className="form-control" id="desc" value={this.state.desc} onChange={this.handleChange}></textarea>
          <br />
        </form>

          <button className="btn btn-outline-success" id="done" onClick={this.handleTransaction}> Done </button>
      </div>  
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    TransactionRequest : () => {
      dispatch(TransactionRequestAction());
    }

  }
}



export default connect(null, mapDispatchToProps) (TransactionView);