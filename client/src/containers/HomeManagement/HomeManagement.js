import React from "react";
import "./styles.scss";
import { Main } from "./components";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { name } from "./reducers";
import * as action from "./actions";

class HomeManagement extends React.Component {


  render() {
    const {
      ...rest
    } = this.props;
    return (<Main {
      ...rest
    }
    />
    )
  }
}
var mapStateToProps = state => {
  return {
    ...state[name],
  }
}

var mapDispatchToProp = dispatch => {
  const actions = {
    ...action,
  }
  return {
    actions: bindActionCreators(actions, dispatch)
  }

}
export default connect(mapStateToProps, mapDispatchToProp)(HomeManagement);
