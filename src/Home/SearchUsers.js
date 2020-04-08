import React from "react";
import {correctEmail, verifyUser} from "../helpers";
import {firebaseDB} from "../firebase";
import {Link} from "react-router-dom";

class SearchUsers extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      email : "",
      userName : undefined
    }

  }

  handleInput = (e) => {
    this.setState({email : e.target.value}, async () => {
      if(this.state.email.length > 1)
      {
        let name = await verifyUser(this.state.email);
        if(name && name.exists())
          this.setState({userName : name.val()})
        else
          this.setState({userName : undefined})
      }
    });

  }

  render() {
    return(
      <div>
        <hr />
        <h3>Find A User</h3>
        <input className="form-control mx-auto w-50 " type="text" placeholder="@gmail.com" value={this.state.email} onChange={this.handleInput}/>
        <div>
        <Link to={"/user/" + correctEmail(this.state.email)} className="btn" > <h3>{this.state.userName}</h3> </Link>
        </div>
      </div>
    );

  }
}

export default SearchUsers;