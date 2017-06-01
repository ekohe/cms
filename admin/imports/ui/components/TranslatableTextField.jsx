import React from 'react';

import TextField from 'material-ui/TextField';

import humanizeString from '/common/imports/helpers/humanizeString';

export default class TranslatableTextField extends React.Component {
  constructor(props) {
    super(props)
    let newState = _.clone(this.props)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = {}
    }
    this.state = newState
  }

  componentWillReceiveProps(nextProps) {
    let newState = _.clone(nextProps)
    if (typeof(newState.value)=='undefined') {
      newState['value'] = {}
    }

    this.setState(newState);
  }

  setValue(locale, newValue) {
    let values = (this.state.value || {});
    values[locale] = newValue;
    this.setState({value: values});
    this.props.onChange(this.props.name, values);
  }

  render() {
    const { name, label, localizations } = this.props;

    const styles = {
      container: {
        marginBottom: '30px'
      },
      textField: {
        marginBottom: '5px'
      }
    }

    let _label = label || humanizeString(name)

    return (
      <div style={styles.container}>
        <h4>
          {_label}
        </h4>
        {localizations.map(locale =>
            <TextField
              key={"prop_"+name+"_"+locale._id}
              floatingLabelText={_label+" in "+locale.name}
              fullWidth={true}
              multiLine={true}
              style={styles.textField}
              value={this.state.value ? this.state.value[locale.locale] : ''}
              onChange={(event) => this.setValue(locale.locale, event.target.value)}
            />
          )}
      </div>
    )
  }
}
