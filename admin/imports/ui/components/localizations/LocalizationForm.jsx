import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

export default class LocalizationForm extends React.Component {
  state = {
    position: 1,
    name: '',
    native_name: '',
    locale: '',
    default: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const styles = {
      checkbox: {
        marginTop: '10px'
      }
    }
    return (
      <div>
          <TextField
            floatingLabelText="Position"
            fullWidth={true}
            value={this.state.position}
            onChange={(event) => this.setState({'position': event.target.value})}
          />
          <br />
          <TextField
            floatingLabelText="Name"
            fullWidth={true}
            value={this.state.name}
            onChange={(event) => this.setState({'name': event.target.value})}
          />
          <br />
          <TextField
            floatingLabelText="Native name"
            fullWidth={true}
            value={this.state.native_name}
            onChange={(event) => this.setState({'native_name': event.target.value})}
          />
          <br />
          <TextField
            floatingLabelText="Locale code"
            fullWidth={true}
            value={this.state.locale}
            onChange={(event) => this.setState({'locale': event.target.value})}
          />
          <br />
          <TextField
            floatingLabelText="ISO 639-1 code"
            fullWidth={true}
            value={this.state.iso6391_code}
            onChange={(event) => this.setState({'iso6391_code': event.target.value})}
          />
          <br/>
          <Checkbox
            label="Default locale"
            checked={this.state.default}
            style={styles.checkbox}
            onCheck={(event, checked) => this.setState({'default': checked})}
          />
      </div>
      )
  }
}
