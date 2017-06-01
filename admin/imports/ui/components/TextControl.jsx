import React from 'react';

import TextField from 'material-ui/TextField';

import humanizeString from '/common/imports/helpers/humanizeString';

export default class TextControl extends React.Component {
  constructor(props) {
    super(props)
    let newState = _.clone(this.props)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = ''
    }
    this.state = newState
  }

  componentWillReceiveProps(nextProps) {
    let newState = _.clone(nextProps)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = ''
    }

    this.setState(newState);
  }

  setValue(newValue) {
    this.setState({value: newValue});
    this.props.onChange(this.props.name, newValue);
  }

  render() {
    const { name, localizations } = this.props;

    const styles = {
      container: {
        marginBottom: '30px'
      },
      textField: {
        marginBottom: '5px'
      }
    }

    return (
      <div style={styles.container}>
        <h4>
          {humanizeString(name)}
        </h4>
          <TextField
            floatingLabelText={humanizeString(name)}
            fullWidth={true}
            multiLine={true}
            style={styles.textField}
            value={this.state.value}
            onChange={(event) => this.setValue(event.target.value)}
          />
      </div>
    )
  }
}
