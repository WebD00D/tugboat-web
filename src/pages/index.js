import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../fire";
import "../layouts/index.css";
import "../layouts/fcss.css";

import { connect } from "react-redux";

import ComponentKitHeader from "../components/ComponentKitHeader";
import ComponentKit from "../components/ComponentKit";

import ValidationSample from "../components/ValidationSample";
import FoodCategorySelectors from "../components/FoodCategorySelectors";
import MerchantSettings from "../components/MerchantSettings";
import MenuCategory from "../components/MenuCategory";
import MerchantHours from "../components/MerchantHours";
import MerchantOrderSettings from "../components/MerchantOrderSettings";


class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <div className="m-b-100">
          <h1>COG Components</h1>
          <p>
            <b>What's this?</b> Essentially a style guide, but components have
            full functionality. We're creating the puzzle pieces to the COG
            Merchant app first, then we'll add display logic, routing, etc. and
            hook it up to the database.
          </p>
          <p>
            This page should only house working components. While developing,
            <b> KNOWN Team</b> should use <Link to="/known">this</Link> page to
            import their WIP components. Christian will use{" "}
            <Link to="/christian">this</Link>
          </p>
          <p>
            When you import a complete component, be sure to wrap it an{" "}
            <code>ComonentKit</code> with an id, and fileName prop. Then update
            the nav / task list.
          </p>
        </div>

        <div className="fixed-component-nav">
            <a href="/#merchant-order-settings" className="fc-purple td-none">Merchant Order Settings</a>
            <a href="/#merchant-hours" className="fc-purple td-none ">Merchant Hours</a>
            <a href="/#validation" className="fc-purple td-none">Validation Sample</a>
            <a href="/#food-selectors" className="fc-purple td-none">Cuisine Types</a>
            <a href="/#merchant-settings" className="fc-purple td-none">Merchant Settings</a>
            <a href="/#menu-category" className="fc-purple td-none">Menu Categories</a>
        </div>

        {/* COMPONENT LIST */}

        <ComponentKit id="merchant-order-settings" fileName="MerchantOrderSettings.js">
          <MerchantOrderSettings />
        </ComponentKit>

        <ComponentKit id="merchant-hours" fileName="MerchantHours.js">
          <MerchantHours />
        </ComponentKit>

        <ComponentKit id="validation" fileName="ValidationSample.js">
          <ValidationSample />{" "}
        </ComponentKit>

        <ComponentKit id="food-selectors" fileName="FoodCategorySelectors.js">
          <FoodCategorySelectors />{" "}
        </ComponentKit>

        <ComponentKit id="merchant-settings" fileName="MerchantSettings.js">
          <MerchantSettings />
        </ComponentKit>

        <ComponentKit id="menu-category" fileName="MenuCategory.js">
          <MenuCategory menuId={false} />
        </ComponentKit>

        {/* ENC COMPONENT LIST */}
      </div>
    );
  }
}

const mapStateToProps = ({ merchantId, userAuthenticated }) => {
  return { merchantId, userAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    createAndSignInUser: (userId, first, last, email) =>
      dispatch({
        type: `CREATE_AND_SIGNIN_USER`,
        userId,
        first,
        last,
        email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
