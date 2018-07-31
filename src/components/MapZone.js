import React, { PureComponent } from "react";

import cx from "classnames";

const GOOGLE_API_KEY = "AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI";

import { Button, Icon, Spin } from "antd";

class MapZone extends PureComponent {
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

    console.log("CURRENT SAVED COORDS", this.props.currentCoordinateSet);

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
            strokeColor: zoneColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zoneColor,
            fillOpacity: 0.9,
            zoneTitle: "Zone 1"
          });

          aNewShape.setMap(map);
          google.maps.event.addListener(
            aNewShape,
            "click",
            function(event) {
              this._handleSetSelection(aNewShape);

              console.log("NEW SHAPE", aNewShape);
              this._getPolygonCoords(aNewShape);
            }.bind(this)
          );
          // END CONSTRUCT POLYGON

          var all_overlays = [];
          var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON]
            },

            polygonOptions: {
              clickable: true,
              draggable: false,
              editable: false,
              fillColor: zoneColor,
              fillOpacity: 0.9,
              strokeColor: "#000000",
              strokeOpacity: 0.8
            }
          });

          drawingManager.setMap(map);

          google.maps.event.addListener(
            drawingManager,
            "overlaycomplete",
            function(event) {
              all_overlays.push(event);
              drawingManager.setDrawingMode(null);

              var newShape = event.overlay;
              newShape.type = event.type;

              this._getPolygonCoords(newShape);

              google.maps.event.addListener(
                newShape,
                "click",
                function() {
                  this._handleSetSelection(newShape);
                }.bind(this)
              );

              this._handleSetSelection(newShape);
            }.bind(this)
          );

          all_overlays.push(event);
          all_overlays.push();
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
        <div className="input-wrap m-b-20">
          <label>DRAW ZONE POLYGON {this.state.updating}</label>
        </div>
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
        </div>{" "}
        <div className="m-t-20 m-b-20">
          <Button type="danger" onClick={() => this._handleDeleteZone()}>
            Delete Zone <Icon type="close" />
          </Button>
        </div>
      </div>
    );
  }
}

export default MapZone;
