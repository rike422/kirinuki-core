import React, { PropTypes } from "react";
import CodeMirror from "react-codemirror";

export default class HtmlEditor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  onHtmlChange(str) {
    this.props.dispatch('updateHtml', str)
  }

  componentDidMount() {
    if (navigator) {
      require('codemirror/mode/htmlmixed/htmlmixed');
    }
  }

  render() {
    const option = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'application/json'
    }
    return (
      <div className="HtmlEditorContainer">
        <CodeMirror value={this.props.html}
                    options={option}
                    onChange={this.onHtmlChange.bind(this)} />
      </div>

    )
  }
}

HtmlEditor.propTypes = {
  html: PropTypes.string.required,
};

HtmlEditor.defaultProps = {
  html: 'body!'
}
