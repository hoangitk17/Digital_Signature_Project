import React from "react";
import "./styles.scss";
import { Header } from "./components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { name } from "./reducers";
import * as action from "./actions";

class HeaderManagement extends React.Component {

  componentDidMount() {
      this.props.actions.getUserList();
  }

  render() {
    const {
      ...rest
    } = this.props;
    return (<Header {
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
export default connect(mapStateToProps, mapDispatchToProp)(HeaderManagement);
