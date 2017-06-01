import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import ImageSelector from '../ImageSelector'
import ImageSelectorList from '../ImageSelectorList'
import TranslatableTextField from '../TranslatableTextField'
import TranslatableTextFieldsList from '../TranslatableTextFieldsList'
import TextControlList from '../TextControlList'

export default class JobForm extends React.Component {
  state = {
    slug: '',
    position: {},
    published: false,
    cities: [],
    banner: '',
    description: {},
    responsibilities_title: {},
    responsibilities: [],
    skills_title: {},
    skills: [],
    benefits_title: {},
    benefits: [],
    locations: []
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  // Events triggered when value changes
  onChange = (key, value) => {
    const changes = {}
    changes[key] = value
    this.setState(changes)
  }

  onPublishedToggle = () => {
    this.setState({published: !this.state.published});
  }

  render() {
    const { localizations, object } = this.props;

    const styles = {
      toggle: {
        width: '50%'
      }
    }

    return (
      <div>
        <Tabs>
            <Tab label="General">
            <h4>Slug</h4>

            <TextField
              floatingLabelText="Slug"
              fullWidth={true}
              value={this.state.slug}
              onChange={(event) => this.setState({slug: event.target.value})}
            />

            <TranslatableTextField
              name="position"
              localizations={localizations}
              value={this.state.position}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <Toggle
              label="Published"
              toggled={this.state.published}
              onToggle={() => this.onPublishedToggle()}
              style={styles.toggle}/>

            <ImageSelector
              name="banner"
              value={this.state.banner}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TextControlList
              name="cities"
              value={this.state.cities}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>

          <Tab label="Description">
            <TranslatableTextField
              name="description"
              localizations={localizations}
              value={this.state.description}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>

          <Tab label="Responsibilities">
            <TranslatableTextField
              name="responsibilities_title"
              localizations={localizations}
              value={this.state.responsibilities_title}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextFieldsList
                name="responsibilities"
                localizations={localizations}
                value={this.state.responsibilities}
                onChange={(key, value) => this.onChange(key, value)}
                />
          </Tab>

          <Tab label="Skills">
            <TranslatableTextField
              name="skills_title"
              localizations={localizations}
              value={this.state.skills_title}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextFieldsList
                name="skills"
                localizations={localizations}
                value={this.state.skills}
                onChange={(key, value) => this.onChange(key, value)}
                />
          </Tab>

          <Tab label="Benefits">
            <TranslatableTextField
              name="benefits_title"
              localizations={localizations}
              value={this.state.benefits_title}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextFieldsList
                name="benefits"
                localizations={localizations}
                value={this.state.benefits}
                onChange={(key, value) => this.onChange(key, value)}
                />
          </Tab>

        </Tabs>
      </div>
      )
  }
}
