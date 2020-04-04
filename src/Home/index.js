import React from "react";
import {connect} from "react-redux";

class Home extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.authenticated)
    {
      return (
        <div className="continer">
          <h1>Welcome {this.props.userName}</h1>
          <h6>{this.props.email}</h6>
        </div>
      )
    }
    else
    {
      return (
        <div className="continer">
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

export default connect(mapStateToProps,null)(Home);