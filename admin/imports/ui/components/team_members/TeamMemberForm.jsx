import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import ImageSelector from '../ImageSelector'
import TranslatableTextField from '../TranslatableTextField'
import TranslatableTextFieldsList from '../TranslatableTextFieldsList'
import TextControl from '../TextControl'

export default class TeamMemberForm extends React.Component {
  state = {
    slug: '',
    first_name: '',
    last_name: '',
    original_name: '',
    position: {},
    rank: 1,
    published: false,
    avatar: '',
    banner: '',
    description: '',
    links: []
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

            <h4>First name</h4>
            <TextField
              floatingLabelText="First name"
              fullWidth={true}
              value={this.state.first_name}
              onChange={(event) => this.setState({first_name: event.target.value})}
            />

            <h4>Last name</h4>
            <TextField
              floatingLabelText="Last name"
              fullWidth={true}
              value={this.state.last_name}
              onChange={(event) => this.setState({last_name: event.target.value})}
            />

            <h4>Name in native language</h4>
            <TextField
              floatingLabelText="Name in native language"
              fullWidth={true}
              value={this.state.original_name}
              onChange={(event) => this.setState({original_name: event.target.value})}
            />

            <TranslatableTextField
              name="position"
              localizations={localizations}
              value={this.state.position}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <h4>Order</h4>
            <TextField
              floatingLabelText="Order"
              fullWidth={true}
              value={this.state.rank}
              onChange={(event) => this.setState({rank: event.target.value})}
            />

            <Toggle
              label="Published"
              toggled={this.state.published}
              onToggle={() => this.onPublishedToggle()}
              style={styles.toggle}/>

          </Tab>

          <Tab label="Pictures">
            <ImageSelector
              name="avatar"
              value={this.state.avatar}
              onChange={(key, value) => this.onChange(key, value)}
              />

            <ImageSelector
              name="banner"
              value={this.state.banner}
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

            <TranslatableTextFieldsList
                name="links"
                localizations={localizations}
                value={this.state.links}
                onChange={(key, value) => this.onChange(key, value)}
                />
          </Tab>
        </Tabs>
      </div>
      )
  }
}
