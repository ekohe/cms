import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import ImageSelector from '../ImageSelector'
import ImageSelectorList from '../ImageSelectorList'
import TranslatableTextField from '../TranslatableTextField'
import TranslatableTextFieldsList from '../TranslatableTextFieldsList'
import TextControlList from '../TextControlList'

export default class ProjectForm extends React.Component {
  state = {
    slug: '',
    name: {},
    featured_on_homepage: false,
    logo: '',
    small_picture: '',
    banner: '',
    project_type: {},
    pictures: [],
    description: {},
    key_features: [],
    services: [],
    technologies: [],
    links_labels: [],
    links_urls: [],
    links_types: [],
    meta_description: {},
    meta_keywords: {},
    page_title: {}
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

  onFeaturedHomepageToggle = () => {
    this.setState({featured_on_homepage: !this.state.featured_on_homepage});
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
              name="name"
              localizations={localizations}
              value={this.state.name}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <Toggle
              label="Featured on homepage"
              toggled={this.state.featured_on_homepage}
              onToggle={() => this.onFeaturedHomepageToggle()}
              style={styles.toggle}/>

            <ImageSelector
              name="logo"
              value={this.state.logo}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <ImageSelector
              name="small_picture"
              value={this.state.small_picture}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>

          <Tab label="Pictures">
            <ImageSelector
              name="banner"
              value={this.state.banner}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <ImageSelectorList
              name="pictures"
              value={this.state.pictures}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>

          <Tab label="Description">
            <TranslatableTextField
              name="project_type"
              localizations={localizations}
              value={this.state.project_type}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextField
              name="subtitle"
              localizations={localizations}
              value={this.state.subtitle}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextField
              name="description"
              localizations={localizations}
              value={this.state.description}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextFieldsList
              name="key_features"
              localizations={localizations}
              value={this.state.key_features}
              onChange={(key, value) => this.onChange(key, value)}
              />
            <TranslatableTextFieldsList
              name="services"
              localizations={localizations}
              value={this.state.services}
              onChange={(key, value) => this.onChange(key, value)}
              />
            <ImageSelectorList
              name="technologies"
              localizations={localizations}
              value={this.state.technologies}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>
          <Tab label="Links">
            <TranslatableTextFieldsList
              name="links_labels"
              localizations={localizations}
              value={this.state.links_labels}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TranslatableTextFieldsList
              name="links_urls"
              localizations={localizations}
              value={this.state.links_urls}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <TextControlList
              name="links_types"
              value={this.state.links_types}
              onChange={(key, value) => this.onChange(key, value)}
              />
          </Tab>
          <Tab label="Meta">
            <TranslatableTextField
              name="page_title"
              localizations={localizations}
              value={this.state.page_title}
              onChange={(key, value) => this.onChange(key, value)}
              />

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
          </Tab>
        </Tabs>
      </div>
      )
  }
}
