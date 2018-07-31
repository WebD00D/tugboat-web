import React, { PureComponent } from "react";

import cx from "classnames";

const GOOGLE_API_KEY = "AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI";

import { Button, Icon, Spin } from "antd";

import Loading from "../components/Loading";

class MapZonesReadOnly extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePlaceMarker = this._handlePlaceMarker.bind(this);
    this._handleSetSelection = this._handleSetSelection.bind(this);
    this._getPolygonCoords = this._getPolygonCoords.bind(this);
    this._handleDeleteZone = this._handleDeleteZone.bind(this);

    this.selectedShape;

    this.state = {
      loading: true,
      updating: ""
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });

    const zoneColor = this.props.color;

    console.log(" SAMPLE COORDINATE SET ", this.props.coordinateSet);

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        function(position) {
          // initializes the map
          let map = new google.maps.Map(
            document.getElementById(this.props.id),
            {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 10
            }
          );

          this.props.coordinateSet &&
            Object.keys(this.props.coordinateSet).map(key => {
              console.log("SINGLE COORDINATE", this.props.coordinateSet[key]);
              const zoneObj = this.props.coordinateSet[key];
              let zoneCoordinates = [];

              zoneObj.coordinates.forEach(c => {
                console.log(`coordinate pair for ${zoneObj.name}`, c);
                let splitCoord = c.split(",");
                const lat = Number(splitCoord[0]);
                const long = Number(splitCoord[1]);
                zoneCoordinates.push(new google.maps.LatLng(lat, long));
              });

              console.log("FINSIHED LOOP");

              let zoneShape = new google.maps.Polygon({
                paths: zoneCoordinates,
                draggable: false,
                editable: false,
                strokeColor: zoneObj.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zoneObj.color,
                fillOpacity: 0.9,
                zoneTitle: zoneObj.name
              });

              zoneShape.setMap(map);
            });

          // CONSTRUCT POLYGON
          // NOTE: We'd run this block of code for each group of zone pulled in from the db..

          var aNewShapeCoords = [];
          this.props.currentCoordinateSet &&
            this.props.currentCoordinateSet.forEach(c => {
              let splitCoord = c.split(",");
              const lat = Number(splitCoord[0]);
              const long = Number(splitCoord[1]);
              aNewShapeCoords.push(new google.maps.LatLng(lat, long));
            });

          let aNewShape = new google.maps.Polygon({
            paths: aNewShapeCoords,
            draggable: false,
            editable: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zoneColor,
            fillOpacity: 0.9,
            zoneTitle: "Zone 1"
          });

          aNewShape.setMap(map);

          // END CONSTRUCT POLYGON
        }.bind(this)
      );
    }
  }

  _handlePlaceMarker(location, map) {
    let marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  _handleSetSelection(shape) {
    console.log("shape is clicked", shape);
    // this._handleClearSelection(shape);

    if (this.selectedShape) {
      this.selectedShape.setEditable(false);
    }

    shape.setEditable(true);
    this.selectedShape = shape;
  }

  _handleDeleteZone() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedShape = null;
    }

    this.props.deleteCoordinates();
  }

  _getPolygonCoords = function(newShape) {
    var len = newShape.getPath().getLength();

    let coordArray = [];

    for (var i = 0; i < len; i++) {
      coordArray.push(
        newShape
          .getPath()
          .getAt(i)
          .toUrlValue(6)
      );
    }

    console.log("COORD ARRAY", coordArray);
    this.props.saveCoordinates(coordArray);
  };

  render() {
    return (
      <div className="w-100p">
        <div
          style={{
            height: this.props.height,
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
          id={this.props.id}
        >
          <div className="input-wrap m-b-20">
            <label>... LOADING MAP ...</label>
          </div>
          <Spin />
        </div>
      </div>
    );
  }
}

export default MapZonesReadOnly;
