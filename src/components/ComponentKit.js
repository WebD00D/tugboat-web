import React, { PureComponent } from "react";
import "../layouts/fcss.css";

class ComponentKit extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className="mx-w-600">
        <div className="m-b-40">
          <code style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {this.props.fileName}
          </code>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default ComponentKit;
