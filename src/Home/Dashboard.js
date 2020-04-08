import React from "react";
import {connect} from "react-redux"
import SearchUsers from "./SearchUsers"; 

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    if(this.props.authenticated)
    {
      return(
        <div className="container">
          <h1>Dashboard</h1>
          <SearchUsers />
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

export default connect(mapStateToProps, null) (Dashboard);