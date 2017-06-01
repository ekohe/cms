import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

// UI Components
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TranslatableTextField from '../TranslatableTextField'

// Import the 'editable' collections
import * as collections from '/common/imports/collections/index'

// Helpers
import humanizeString from '/common/imports/helpers/humanizeString';
import singularizeString from '/common/imports/helpers/singularizeString';

export default class PageForm extends React.Component {
  state = {
    title: {},
    slug: '',
    type: 'static',
    meta_description: {},
    meta_keywords: {},
    json_ld: {},
    html_class: ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  setTitle(locale, newTitle) {
    let title = this.state.title;
    title[locale] = newTitle;
    this.setState({title: title});
  }

  handleStatusChange = (event, index, value) => this.setState({status: value});

  handleTypeRadioButtonChange = (value) => {
    if (value == 'static') {
      this.setState({collection: null})
    }
    this.setState({type: value});
  }

  handleCollectionChange = (event, index, value) => this.setState({collection: value});

  // Events triggered when value changes
  onChange = (key, value) => {
    const changes = {}
    changes[key] = value
    this.setState(changes)
  }

  render() {
    const { localizations, object } = this.props;
    const styles = {
      radioButtonGroup: {
        marginTop: 16,
      },
      radioButtonGroupLabelStyle: {
        lineHeight: '28px',
      },
      radioButton: {
        marginBottom: 16,
      },
      textField: {
        marginBottom: '5px'
      },
      title: {
        marginTop: '20px',
        marginBottom: '-5px'
      }
    };

    return (
      <Tabs>
        <Tab label="General">
          <h4 style={styles.title}>Title</h4>
          {localizations.map(locale =>
            <TextField
              key={"title_"+locale._id}
              floatingLabelText={"Title in " +locale.name}
              fullWidth={true}
              style={styles.textField}
              value={this.state.title[locale.locale]}
              onChange={(event) => this.setTitle(locale.locale, event.target.value)}
            />
          )}
          <br/>
          <h4 style={styles.title}>Status</h4>
          <SelectField
            fullWidth={true}
            floatingLabelText="Status"
            value={this.state.status}
            onChange={this.handleStatusChange}>
            <MenuItem value={'draft'} primaryText="Draft" />
            <MenuItem value={'published'} primaryText="Published" />
          </SelectField>
          <br/>
          <h4 style={styles.title}>Type</h4>
          <div className="page_type">
            <div className="page_type_selection">
              <RadioButtonGroup
                name="type"
                valueSelected={this.state.type}
                style={styles.radioButtonGroup}
                onChange={(event, value) => this.handleTypeRadioButtonChange(value)}>
                <RadioButton
                  value="static"
                  label="Static"
                  style={styles.radioButton}
                  labelStyle={styles.radioButtonGroupLabelStyle}

                />
                <RadioButton
                  value="collection"
                  label="Collection"
                  style={styles.radioButton}
                  labelStyle={styles.radioButtonGroupLabelStyle}
                />
                <RadioButton
                  value="element"
                  label="Element"
                  style={styles.radioButton}
                  labelStyle={styles.radioButtonGroupLabelStyle}
                />
              </RadioButtonGroup>
            </div>
            <div className="page_collection_selection">
              {this.state.type != 'static' ?
                <SelectField
                  fullWidth={true}
                  floatingLabelText={this.state.type=='collection' ? "Choose the collection to list" : "Choose the type of element"}
                  value={this.state.collection}
                  onChange={this.handleCollectionChange}>
                  {Object.keys(collections).map(collection =>
                    <MenuItem key={"collection_"+collection} value={collection} primaryText={this.state.type=='collection' ? humanizeString(collection) : singularizeString(humanizeString(collection))} />
                  )}
                </SelectField>
                : null
              }
            </div>
          </div>
          <TextField
            floatingLabelText={this.state.type=='element' ? "Slug (use :slug as parameter to find the element)" : "Slug"}
            fullWidth={true}
            value={this.state.slug}
            onChange={(event) => this.setState({'slug': event.target.value})}
          />
        </Tab>
        <Tab label="Meta">
          <TranslatableTextField
            name="meta_description"
            localizations={localizations}
            value={this.state.meta_description}
            onChange={(key, value) => this.onChange(key, value)}
            />

          <TranslatableTextField
            name="meta_keywords"
            localizations={localizations}
            value={this.state.meta_keywords}
            onChange={(key, value) => this.onChange(key, value)}
            />

          <TranslatableTextField
            label="JSON-LD"
            name="json_ld"
            localizations={localizations}
            value={this.state.json_ld}
            onChange={(key, value) => this.onChange(key, value)}
            />
        </Tab>
        <Tab label="Advanced">
          <h4 style={styles.title}>HTML class</h4>
          <TextField
            floatingLabelText={"HTML class (use 'dark' to enable the dark menu style)"}
            fullWidth={true}
            value={this.state.html_class}
            onChange={(event) => this.setState({'html_class': event.target.value})}
          />
        </Tab>
      </Tabs>
      )
  }
}
