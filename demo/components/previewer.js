import React, { PropTypes } from 'react'
import JSONViewer from 'react-json-viewer';

export default class Previewer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      json: {}
    }
  }

  render() {
    const { json } = this.props
    return (
      <div>
        <JSONViewer json={json}>
        </JSONViewer>
      </div>
    )
  }
}

Previewer.propTypes = {
  json: PropTypes.object.isRequired
}