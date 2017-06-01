import React from 'react';

// UI Components
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { IndexLink, Link } from 'react-router';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import TranslateIcon from 'material-ui/svg-icons/action/translate';
import TocIcon from 'material-ui/svg-icons/action/toc';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import LocationCityIcon from 'material-ui/svg-icons/social/location-city'
import PhoneLinkIcon from 'material-ui/svg-icons/hardware/phonelink'
import FaceIcon from 'material-ui/svg-icons/action/face'
import SupervisorAccountIcon from 'material-ui/svg-icons/action/supervisor-account'
import MessageIcon from 'material-ui/svg-icons/communication/message'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'

export default class Navigation extends React.Component {
  render() {
    return (
      <div id="navigation" className={this.props.visible ? 'visible' : 'hidden'}>
        <Menu>
          <MenuItem primaryText="Home" leftIcon={<DashboardIcon />} containerElement={<IndexLink to="/" />}/>
          <Divider />
          <MenuItem primaryText="Menu" leftIcon={<TocIcon />} containerElement={<Link to="/menu_entries"/>}/>
          <MenuItem primaryText="Pages" leftIcon={<DescriptionIcon />} containerElement={<Link to="/pages"/>}/>
          <MenuItem primaryText="Images" leftIcon={<PhotoIcon />} containerElement={<Link to="/images"/>}/>
          <MenuItem primaryText="Localizations" leftIcon={<TranslateIcon />} containerElement={<Link to="/localizations"/>}/>
          <MenuItem primaryText="Users" leftIcon={<SupervisorAccountIcon />} containerElement={<Link to="/users"/>}/>
          <Divider />
          <MenuItem primaryText="Offices" leftIcon={<LocationCityIcon />} containerElement={<Link to="/offices"/>}/>
          <MenuItem primaryText="Projects" leftIcon={<PhoneLinkIcon />} containerElement={<Link to="/projects"/>}/>
          <MenuItem primaryText="Team members" leftIcon={<FaceIcon />} containerElement={<Link to="/team_members"/>}/>
          <MenuItem primaryText="Jobs" leftIcon={<AssignmentIcon />} containerElement={<Link to="/jobs"/>}/>
          <Divider />
          <MenuItem primaryText="Inquiries" leftIcon={<MessageIcon />} containerElement={<Link to="/inquiries"/>}/>
        </Menu>
      </div>
    )
  }
}
