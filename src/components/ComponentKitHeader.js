import React, { PureComponent } from "react";
import "../layouts/fcss.css";

class ComponentKitHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="m-b-40">
        <code style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          {this.props.fileName}
        </code>
      </div>
    );
  }
}

export default ComponentKitHeader;
