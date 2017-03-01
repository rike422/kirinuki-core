import React, { PropTypes } from "react";
import CodeMirror from "react-codemirror";

export default class JsonEditor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  onJsonChange(str) {
    this.props.dispatch('updateJson', str)
  }

  componentDidMount() {
    if (navigator) {
      require('codemirror/mode/javascript/javascript');
    }
  }

  render() {
    const option = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'application/json'
    }
    return (
        <div className="JsonEditorContainer">
        <CodeMirror value={this.props.json}
                    options={option}
                    height="150"
                    widrh="150"
                    onChange={this.onJsonChange.bind(this)}/>
        </div>
    )
  }
}

JsonEditor.propTypes = {
  json: PropTypes.string,
};

JsonEditor.defaultProps = {
  json: 'body!'
}
