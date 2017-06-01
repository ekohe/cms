import React from 'react';

import Toggle from 'material-ui/Toggle';

import humanizeString from '/common/imports/helpers/humanizeString';

export default class BooleanControl extends React.Component {
  constructor(props) {
    super(props)
    let newState = _.clone(this.props)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = false
    }
    this.state = newState
  }

  componentWillReceiveProps(nextProps) {
    let newState = _.clone(nextProps)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = false
    }

    this.setState(newState);
  }

  setValue(newValue) {
    this.setState({value: newValue});
    this.props.onChange(this.props.name, newValue);
  }

  onToggle() {
    const newValue = !this.state.value
    this.setState({value: newValue});
    this.props.onChange(this.props.name, newValue);
  }

  render() {
    const { name, localizations } = this.props;

    const styles = {
      container: {
        marginBottom: '20px',
        marginTop: '30px'
      },
      toggle: {
        width: '50%'
      }
    }

    return (
      <div style={styles.container}>
        <Toggle
          label={humanizeString(name)}
          toggled={this.state.value}
          onToggle={() => this.onToggle()}
          style={styles.toggle}
        />
      </div>
    )
  }
}
