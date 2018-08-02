import React from "react";

import "./index.css";

export const PageContainer = ({ children }) => (
  <div className="ui__container">{children}</div>
);

export const PageContainerSmall = ({ children }) => (
  <div className="ui__container ui__container--sm">{children}</div>
);

export const Box = ({ children }) => (
  <div className="ui__box">{children}</div>
);

export const FlexColumn = ({ children }) => (
  <div className="ui__flex-col">{children}</div>
);

export const FormField = ({ children }) => (
  <div className="ui__form-field">
    {children}
  </div>
)

