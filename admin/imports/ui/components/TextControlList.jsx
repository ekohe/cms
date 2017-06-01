import React from 'react'

import humanizeString from '/common/imports/helpers/humanizeString'
import singularizeString from '/common/imports/helpers/singularizeString';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class TextControlList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  add() {
    let value = this.state.value
    if (typeof(value)=='undefined') { value = [] }
    value.push('')
    this.setState({value})
  }

  remove(index) {
    let value = this.state.value
    if (typeof(value)=='undefined') { value = [] }
    if (value.length>index) {
      value = value.slice(0, index).concat(value.slice(index+1, value.length))
      this.setState({value})
      this.props.onChange(this.props.name, value)
    }
  }

  setValue(index, newValue) {
    let value = this.state.value;
    value[index] = newValue;
    this.setState({value});
    this.props.onChange(this.props.name, value);
  }

  render() {
    const { name, localizations } = this.props;

    const style = {
      container: {
        marginBottom: '30px'
      },
      addRemoveButtonContainer: {
        textAlign: 'center'
      },
      textField: {
        marginBottom: '5px'
      },
      horizontalSeparator: {
        marginTop: '20px',
        marginBottom: '35px'
      }
    }

    return (
      <div style={style.container}>
        <h4>
          {humanizeString(name)}
        </h4>

        <div>
          {(this.state.value||[]).map((row, index) =>
            <div key={"row_"+index}>

              <TextField
                floatingLabelText={humanizeString(name)+" #"+(index+1)}
                fullWidth={true}
                multiLine={true}
                style={style.textField}
                value={this.state.value[index]}
                onChange={(event) => this.setValue(index, event.target.value)}
              />

              <div style={style.addRemoveButtonContainer}>
                <RaisedButton label={"Remove #"+(index+1)} secondary={true} onTouchTap={(event) => this.remove(index)} />
              </div>

              <div style={style.horizontalSeparator}></div>
            </div>
          )}
        </div>

        <div style={style.addRemoveButtonContainer}>
          <RaisedButton label="Add" secondary={true} onTouchTap={(event) => this.add()} />
        </div>
      </div>
    )
  }
}
