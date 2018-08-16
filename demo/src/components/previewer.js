import React from "react";
import JSONViewer from "react-json-viewer";

export const Previewer = function(props) {
  const { json } = props;
  return (
    <div className="PreviewerContainer">
      <JSONViewer json={json} />
    </div>
  );
};
