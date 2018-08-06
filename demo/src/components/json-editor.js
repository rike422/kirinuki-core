import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

export function JSONEditor(props) {
  const onJsonChange = (editor, data, value) => {
    props.dispatch("updateJson", value);
  };

  const option = {
    lineNumbers: true,
    lineWrapping: true,
    mode: "application/json"
  };

  return (
    <div className="JsonEditorContainer">
      <CodeMirror
        value={props.json}
        options={option}
        height="150"
        width="150"
        onBeforeChange={onJsonChange}
      />
    </div>
  );
}
