import React, { PureComponent } from "react";
import "../layouts/fcss.css";

import Switch from "./Switch";


class FoodCategorySelectors extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-100p component">
        <div className="component-container">
          <h1 className="fc-purple">Cuisine Types</h1>

          <code>Note: This is just a sample list</code>

          <div className="fx  fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={true} />
              <label className="switch-label">
                  Indian
              </label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={false} />
              <label className="switch-label">
                  Thai
              </label>
            </div>
          </div>
          <div className="fx  fx-j-c m-t-30 mx-600 m-b-20">
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={true} />
              <label className="switch-label">
                  Korean
              </label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={false} />
              <label className="switch-label">
                  Chinese
              </label>
            </div>
          </div>
          <div className="fx  fx-j-c m-t-30 mx-600 m-b-20">
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={false} />
              <label className="switch-label">
                  Soups
              </label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch handleChange={ (value) => console.log(value) } defaultValue={true} />
              <label className="switch-label">
                  Greek
              </label>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default FoodCategorySelectors;
