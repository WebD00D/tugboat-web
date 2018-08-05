import React from 'react'

const NotFoundPage = () => (
  <div className="four-oh-four">
    <div><h1>Nothing here</h1></div>
    <div><img style={{marginBottom: "22px"}} src={require("../assets/404.gif")} /></div>
   <a href="/"> <h1
                style={{
                  color: "#1890ff",
                  marginBottom: "0px",
                  marginTop: "14px;",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  style={{ height: "40px", marginRight: "8px" }}
                  src={require("../assets/icons/steering-wheel.svg")}
                />{" "}
                <b>tugboat</b>
              </h1></a>
  </div>
)

export default NotFoundPage
