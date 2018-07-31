import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../layouts/fcss.css";
import "../layouts/components.css";

import InputField from "./InputField";
import TextareaField from "./TextareaField";
import MenuItem from "./MenuItem";
import Switch from "./Switch";

class MenuCategory extends PureComponent {
  constructor(props) {
    super(props);

    this._handleShowAddForm = this._handleShowAddForm.bind(this);
    this._handleHideEditForm = this._handleHideEditForm.bind(this);
    this._handleEditing = this._handleEditing.bind(this);
    this._handleAddItem = this._handleAddItem.bind(this);
    this._handleUpdateItem = this._handleUpdateItem.bind(this);
    this._handleDeleteItem = this._handleDeleteItem.bind(this);
    this._handleChange = this._handleChange.bind(this);

    this.state = {
      showItemForm: false,
      showEditItemForm: false,

      categoryName: "",
      categoryDescription: "",

      mon: true,
      tues: true,
      wed: true,
      thurs: true,
      fri: true,
      sat: false,
      sun: false,

      newItemName: "",
      newItemDescription: "",
      newItemPrice: "",

      editItemName: "",
      editItemDescription: "",
      editItemPrice: "",
      editItemKey: "",

      // Pre-populate as an example for merchant?
      menuItems: [
        {
          name: "1/2 Salad + 1/2 Sandwhich",
          price: "6.99",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          name: "Greek Salad",
          price: "8.99",
          description: "Lorem ipsum dolor sit amet, consectetur."
        }
      ]
    };
  }

  _handleChange(value, field) {
    switch (field) {
      case "mon":
        this.setState({
          mon: value
        });
        break;
      case "tues":
        this.setState({
          tues: value
        });
        break;
      case "wed":
        this.setState({
          wed: value
        });
        break;
      case "thurs":
        this.setState({
          thurs: value
        });
        break;
      case "fri":
        this.setState({
          fri: value
        });
        break;
      case "sat":
        this.setState({
          sat: value
        });
        break;
      case "sun":
        this.setState({
          sun: value
        });
        break;

      default:
    }
  }

  _handleShowAddForm(key) {
    // TODO:
    // Add validation for name, price, and description..

    //     Merchant by merchant, can pick whether you want the menu to be labeled “menu” or something else, show/hide the photos tab or more info tab
    // For add-ons, option to require x number of add-ons (currently lets you cap but not set minimum)
    // For select multiple option, allow to select multiple of the same (only possible right now using the ‘custom’ option)
    // Better ABC  tagging: field that allows tagging by category and by item
    // Better special tagging; fields for food categories and items that cause it to show only during brunch, breakfast, lunch, and dinner hours (set in the merchant settings)
    // Show different menu items based on day of week
    // Capacity for limited numbers of menu items (marked as sold out / hide when number reaches 0, possibly show remaining number)
    // Allow merchants to mark add-on items, add-on categories, food categories, and sizes as ‘not available’ along with the current food-item-only
    // Allow merchants to sort by what of each item is marked as ‘not available’, also mark multiple items as not available/available at once using checkbox on list view
    // Expanded text display options:
    // Field for a description at top, below header
    // Field for small comment below menu
    // Allow certain categories & items to be tagged as ‘fragile’, causing special output to twinjet (use for soups, fragile items, etc)
    // Ability to highlight certain menu items, tag as ‘favorites’ or ‘sale’, maybe an icon next to name, with a selectable field instead of manually building into a category

    this.setState({
      showItemForm: !this.state.showItemForm
    });
  }

  _handleHideEditForm() {
    this.setState({
      showEditItemForm: false
    });
  }

  _handleAddItem() {
    let currentItems = this.state.menuItems;

    let newItem = {
      name: this.state.newItemName,
      price: this.state.newItemPrice,
      description: this.state.newItemDescription
    };

    currentItems.unshift(newItem);

    this.setState({
      showItemForm: false,
      menuItems: currentItems
    });
  }

  _handleDeleteItem(key) {
    const index = this.state.menuItems.indexOf(this.state.menuItems[key]);
    let newMenu = this.state.menuItems;

    delete newMenu[index];

    this.setState({
      showItemForm: false,
      menuItems: newMenu
    });
  }

  _handleEditing(key) {
    console.log(this.state.menuItems[key]);

    this.setState({
      showEditItemForm: true,
      editItemName: this.state.menuItems[key].name,
      editItemDescription: this.state.menuItems[key].description,
      editItemPrice: this.state.menuItems[key].price,
      editItemKey: key
    });
  }

  _handleUpdateItem() {
    let menu = this.state.menuItems;

    menu[this.state.editItemKey].name = this.state.editItemName;
    menu[this.state.editItemKey].description = this.state.editItemDescription;
    menu[this.state.editItemKey].price = this.state.editItemPrice;

    this.setState({
      menuItems: menu,
      showEditItemForm: false
    });
  }

  render() {
    let menuItemsToDisplay =
      this.state.menuItems &&
      Object.keys(this.state.menuItems).map(
        function(key) {
          return (
            <MenuItem
              key={key}
              itemName={this.state.menuItems[key].name}
              itemPrice={this.state.menuItems[key].price}
              itemDescription={this.state.menuItems[key].description}
              editItem={() => this._handleEditing(key)}
              deleteItem={() => this._handleDeleteItem(key)}
            />
          );
        }.bind(this)
      );

    return (
      <div className="w-100p component">
        <div className="component-container">
          {this.state.showItemForm ? (
            <div className="edit-form">
              <div className="component-container">
                <div className="fx fx-a-c fx-s-b m-b-20">
                  <h2 className="fc-purple">New Menu Item</h2>
                  <div
                    onClick={() => this._handleShowAddForm()}
                    className="fc-red hover f-14"
                  >
                    <i className="fa fa-close" /> <span>Cancel</span>
                  </div>
                </div>

                <InputField
                  setValue={value => this.setState({ newItemName: value })}
                  labelName="Item Name"
                  inputType="text"
                />
                <TextareaField
                  setValue={value =>
                    this.setState({ newItemDescription: value })
                  }
                  labelName="Item Description"
                />
                <InputField
                  setValue={value => this.setState({ newItemPrice: value })}
                  labelName="Item Price"
                  inputType="number"
                />
                <button
                  onClick={() => this._handleAddItem()}
                  className="bg-red button-secondary"
                >
                  Save Item
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {this.state.showEditItemForm ? (
            <div className="edit-form">
              <div className="component-container">
                <div className="fx fx-a-c fx-s-b m-b-20">
                  <h2 className="fc-purple">New Menu Item</h2>
                  <div
                    onClick={() => this._handleHideEditForm()}
                    className="fc-red hover f-14"
                  >
                    <i className="fa fa-close" /> <span>Cancel</span>
                  </div>
                </div>

                <InputField
                  setValue={value => this.setState({ editItemName: value })}
                  labelName="Item Name"
                  inputType="text"
                  initialValue={this.state.editItemName}
                />
                <TextareaField
                  setValue={value =>
                    this.setState({ editItemDescription: value })
                  }
                  initialValue={this.state.editItemDescription}
                  labelName="Item Description"
                />
                <InputField
                  setValue={value => this.setState({ editItemPrice: value })}
                  labelName="Item Price"
                  initialValue={this.state.editItemPrice}
                  inputType="number"
                />
                <button
                  onClick={() => this._handleUpdateItem()}
                  className="bg-red button-secondary"
                >
                  Update Item
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <h1 className="fc-purple">Menu Category & Items</h1>
          <InputField
            setValue={value => this.setState({ categoryName: value })}
            labelName="Category Name"
            placeholder="Lunch, Happy Hour, etc."
            inputType="text"
          />
          <TextareaField
            setValue={value => this.setState({ categoryDescription: value })}
            labelName="Category Description"
          />

          <div className="fx fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "mon")
                }
                defaultValue={this.state.mon}
              />
              <label className="switch-label">Monday</label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "tues")
                }
                defaultValue={this.state.tues}
              />
              <label className="switch-label">Tuesday</label>
            </div>
          </div>

          <div className="fx fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "wed")
                }
                defaultValue={this.state.wed}
              />
              <label className="switch-label">Wednesday</label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "thurs")
                }
                defaultValue={this.state.thurs}
              />
              <label className="switch-label">Thursday</label>
            </div>
          </div>

          <div className="fx fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "fri")
                }
                defaultValue={this.state.fri}
              />
              <label className="switch-label">Friday</label>
            </div>
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "sat")
                }
                defaultValue={this.state.sat}
              />
              <label className="switch-label">Saturday</label>
            </div>
          </div>

          <div className="fx fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "sun")
                }
                defaultValue={this.state.sun}
              />
              <label className="switch-label">Sunday</label>
            </div>

          </div>

          <button
            onClick={() => this._handleShowAddForm()}
            className="bg-red button-secondary"
          >
            Add Menu Item
          </button>

          <div className="m-t-40">{menuItemsToDisplay}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userAuthenticated, merchantId }) => {
  return {
    userAuthenticated,
    merchantId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory);
