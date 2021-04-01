import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class Loading extends Component {
  render() {
    const { show } = this.props
    return (
      <> {
        show ? ReactDOM.createPortal(
          <React.Fragment>
            <div className="e-menu-loading">
            </div>
          </React.Fragment>, document.body
        ) : null
      } </>
    );
  }
}
