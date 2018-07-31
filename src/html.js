import React from "react";
import Helmet from "react-helmet";


let stylesStr;
if (process.env.NODE_ENV === "production") {
  try {
    stylesStr = require("!raw-loader!../public/styles.css");
  } catch (e) {
    console.log(e);
  }
}

module.exports = props => {
  let css;
  if (process.env.NODE_ENV === "production") {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: stylesStr }}
      />
    );
  }


  return (

    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.headComponents}
        {css}
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet" />
        <script src="https://use.fontawesome.com/9aa665cf7f.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI&libraries=drawing" />
        <script src="https://cdn.jsdelivr.net/npm/js-map-label@1.0.1/src/maplabel-compiled.js" />

      </head>
      <body className="sans-serif black">
        <div className="site-wrapper">
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
          {props.postBodyComponents}
        </div>
      </body>
    </html>

  );
};
