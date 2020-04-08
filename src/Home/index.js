import React from "react";
import {connect} from "react-redux";
import {correctEmail} from "../helpers";
import Dashboard from "./Dashboard";
import PublicProfile from "./PublicProfile"
class Home extends React.Component {
  
  constructor(props) {
    super(props)
  }



  render() {
    if(this.props.authenticated )
    {
      if(this.props.email && this.props.match.params.id == correctEmail(this.props.email))
      { return (
          <Dashboard />
        )
      }

      else
      {
        return (
          <PublicProfile userKey={this.props.match.params.id}/>
        )
      }
    }

    else
    {
      return (
        <div className="container">
          <h2>You Got To Login First .. To Start Using The App</h2>
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

export default connect(mapStateToProps, null) (Home);