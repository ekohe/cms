import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import TextField from 'material-ui/TextField';
import ImageSelector from '../ImageSelector'
import ImageSelectorList from '../ImageSelectorList'
import TranslatableTextField from '../TranslatableTextField'

export default class OfficeForm extends React.Component {
  state = {
    slug: '',
    city: {},
    banner: '',
    subtitle: {},
    description: {},
    small_picture: '',
    photo_stream: [],
    timezone: '',
    address: '',
    local_address: '',
    phone_number: '',
    email: '',
    latitude: '',
    longitude: '',
    google_maps_link: '',
    contact_id: '',
    meta_description: {},
    meta_keywords: {}
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

  render() {
    const { localizations, object } = this.props;

    return (
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
            name="city"
            localizations={localizations}
            value={this.state.city}
            onChange={(key, value) => this.onChange(key, value)}
            />

          <ImageSelector
            name="banner"
            value={this.state.banner}
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

          <ImageSelector
            name="small_picture"
            value={this.state.small_picture}
            onChange={(key, value) => this.onChange(key, value)}
            />
        </Tab>
        <Tab label="Photo Stream">
          <ImageSelectorList
            name="photo_stream"
            value={this.state.photo_stream}
            onChange={(key, value) => this.onChange(key, value)}
            />
        </Tab>
        <Tab label="Contact informations">
          <h4>Timezone</h4>

          <TextField
            floatingLabelText="Timezone"
            fullWidth={true}
            value={this.state.timezone}
            onChange={(event) => this.setState({timezone: event.target.value})}
          />

          <h4>Address</h4>

          <TextField
            floatingLabelText="Address"
            fullWidth={true}
            multiLine={true}
            value={this.state.address}
            onChange={(event) => this.setState({address: event.target.value})}
          />

          <h4>Local address</h4>

          <TextField
            floatingLabelText="Local address"
            fullWidth={true}
            value={this.state.local_address}
            multiLine={true}
            onChange={(event) => this.setState({local_address: event.target.value})}
          />

          <h4>Phone number</h4>

          <TextField
            floatingLabelText="Phone number"
            fullWidth={true}
            value={this.state.phone_number}
            onChange={(event) => this.setState({phone_number: event.target.value})}
          />

          <h4>Email</h4>

          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            value={this.state.email}
            onChange={(event) => this.setState({email: event.target.value})}
          />

          <h4>Latitude</h4>

          <TextField
            floatingLabelText="Latitude"
            fullWidth={true}
            value={this.state.latitude}
            onChange={(event) => this.setState({latitude: event.target.value})}
          />


          <h4>Longitude</h4>

          <TextField
            floatingLabelText="Longitude"
            fullWidth={true}
            value={this.state.longitude}
            onChange={(event) => this.setState({longitude: event.target.value})}
          />


          <h4>Google Maps Link</h4>

          <TextField
            floatingLabelText="Google Maps Link"
            fullWidth={true}
            value={this.state.google_maps_link}
            onChange={(event) => this.setState({google_maps_link: event.target.value})}
          />

          <h4>Contact</h4>

          <TextField
            floatingLabelText="Contact (insert id)"
            fullWidth={true}
            value={this.state.contact_id}
            onChange={(event) => this.setState({contact_id: event.target.value})}
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
          </Tab>
        </Tabs>
      )
  }
}
