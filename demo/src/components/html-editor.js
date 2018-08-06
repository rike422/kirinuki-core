import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { lifecycle } from "recompose";

export function HtmlEditor(props) {
  const onHtmlChange = (editor, data, value) => {
    props.dispatch("updateHtml", value);
  };
  const option = {
    lineNumbers: true,
    lineWrapping: true,
    mode: "application/json"
  };
  return (
    <div className="HtmlEditorContainer">
      <CodeMirror
        value={props.html}
        options={option}
        height="150"
        width="150"
        onBeforeChange={onHtmlChange}
      />
    </div>
  );
}
