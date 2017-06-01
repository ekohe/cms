import React from 'react'

// Helpers
import humanizeString from '/common/imports/helpers/humanizeString'
import singularizeString from '/common/imports/helpers/singularizeString';

// UI Components
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField'

// Collections
import { Images } from '/common/imports/collections';

export default class ImageSelectorList extends React.Component {
  constructor(props) {
    super(props)
    let stateAttributes = _.clone(this.props)
    stateAttributes.placeholder = (typeof(this.props.value)=='string')
    this.state = stateAttributes
  }

  componentWillReceiveProps(nextProps) {
    let stateAttributes = _.clone(nextProps)
    stateAttributes.placeholder = (typeof(nextProps.value)=='string')
    this.setState(stateAttributes);
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

  handleChange(index, newValue) {
    let value = this.state.value;
    value[index] = newValue;
    this.setState({value});
    this.props.onChange(this.props.name, value);
  }

  setPlaceholderValue(newValue) {
    this.setState({value: newValue})
    this.props.onChange(this.props.name, newValue);
  }

  placeholderToggled(isInputChecked) {
    if (isInputChecked) {
      this.setState({placeholder: true, value: ''})
    } else {
      this.setState({placeholder: false, value: {}})
    }
  }


  render() {
    const { pageType, name } = this.props;

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
      },
      imagePreview: {
        background: "#eeeeee"
      }
    }

    const dynamicPage = (pageType!=null) && (pageType!='static')

    const dataSource = Images.find({}).fetch().map((image) => ({text: image.name, value: image.name, id: image._id}));

    return (
      <div style={style.container}>
        <h4>
          {humanizeString(name)}
        </h4>

        {dynamicPage &&
          <Checkbox
            label="Placeholder"
            checked={this.state.placeholder}
            onCheck={(event, isInputChecked) => { this.placeholderToggled(isInputChecked) }}
            style={style.toggle}
            />}

      {this.state.placeholder &&
        <TextField
          floatingLabelText="Placeholder"
          value={this.state.value}
          onChange={(event, value) => {this.setPlaceholderValue(value)}}
          />}

        {(this.state.placeholder==false) && <div>
          {(this.state.value||[]).map((row, index) =>
            <div key={"row_"+index}>
              <AutoComplete
                floatingLabelText={singularizeString(humanizeString(name))+" #" + (index+1)}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
                fullWidth={true}
                dataSource={dataSource}
                searchText={(row=='' || Images.findOne(row)==null) ? '' : Images.findOne(row).name}
                onNewRequest={(chosenRequest, i) => ( this.handleChange(index, chosenRequest.id) )}
              />
              <div>
                {(Images.findOne(row)!=null) && <img alt={Images.findOne(row).name} src={Meteor.settings.public.cdn + Images.findOne(row).path} style={style.imagePreview} className="image_details_preview"/>}
              </div>
              <div style={style.addRemoveButtonContainer}>
                <RaisedButton label={"Remove #"+(index+1)} secondary={true} onTouchTap={(event) => this.remove(index)} />
              </div>

              <div style={style.horizontalSeparator}></div>
            </div>
          )}
        </div>}

        {(this.state.placeholder==false) && <div style={style.addRemoveButtonContainer}>
          <RaisedButton label="Add" secondary={true} onTouchTap={(event) => this.add()} />
        </div>}
      </div>
    )
  }
}
