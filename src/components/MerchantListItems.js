import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import InputField from "../components/InputField";

import MerchantListItem from "../components/MerchantListItem";


import { connect } from "react-redux";

class MerchantListItems extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div className="model-list">

        <MerchantListItem merchant="Strange Matter" phone="804.801.6177" sales="$13,431.38" percent={100}  />
        <MerchantListItem merchant="Ellwood Thompson's" phone="804.801.6177" sales="$13,431.38" percent={100} />
        <MerchantListItem merchant="ZZQ" phone="804.801.6177" sales="$13,431.38" percent={100} status={"exception"} />
        <MerchantListItem merchant="The Daily" phone="804.801.6177" sales="$13,431.38"  percent={100} />
        <MerchantListItem merchant="Strawberry Street" phone="804.801.6177" sales="$13,431.38" percent={100}  />
        <MerchantListItem merchant="My Noodle" phone="804.801.6177" sales="$13,431.38" percent={100}  />

    </div>
    );
  }
}

export default MerchantListItems;
