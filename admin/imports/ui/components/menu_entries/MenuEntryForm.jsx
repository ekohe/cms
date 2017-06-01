import React from 'react';
import TextField from 'material-ui/TextField';

export default class MenuEntryForm extends React.Component {
  state = {
    name: {},
    url: '',
    position: ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  setName(locale, newName) {
    let name = this.state.name;
    name[locale] = newName;
    this.setState({name: name});
  }

  render() {
    const { localizations, object } = this.props;
    return (
      <div>
        <TextField
          floatingLabelText="Position"
          fullWidth={true}
          value={this.state.position}
          onChange={(event) => this.setState({'position': event.target.value})}
        />
        <br />

        {localizations.map(locale =>
          <TextField
            key={"name_"+locale._id}
            floatingLabelText={"Name in " +locale.name}
            fullWidth={true}
            value={this.state.name[locale.locale]}
            onChange={(event) => this.setName(locale.locale, event.target.value)}
          />
          )}

          <br />
          <TextField
            floatingLabelText="URL"
            fullWidth={true}
            value={this.state.url}
            onChange={(event) => this.setState({'url': event.target.value})}
          />
      </div>
      )
  }
}
