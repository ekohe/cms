import React from 'react';

// Components
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Image from '/common/imports/ui/components/Image';
import { Link } from 'react-router';

// Helpers
import { rebuildRouteWithLocale, areRoutesEqual } from '/common/imports/routing';
import { browserHistory } from 'react-router'

export default class Navigation extends React.Component {
  setLocale(locale, localizations) {
    const localization = localizations.find(l => l.locale == locale)
    this.setState({ value: locale, name: (localization==null ? null : localization.native_name)});
  }

  constructor(props) {
    super(props);
    const { locale, localizations } = this.props;
    const localization = localizations.find(l => l.locale == locale)
    this.state = {value: locale, name: (localization==null ? null : localization.native_name), open: false};
  }

  componentWillReceiveProps(nextProps) {
    const { locale, localizations } = nextProps;
    this.setLocale(locale, localizations);
  };

  handleLocaleChange = (event, key, locale) => {
    const { location } = this.props
    const pathname = location.pathname
    const newPath = rebuildRouteWithLocale(pathname, locale)
    browserHistory.push(newPath)
  }

  render() {
    const { dispatch, collection, localizations, subscriptionReady, location, locale } = this.props;
    const pathname = location.pathname

    if (!subscriptionReady) {
      return null
    }

    const selectedMenuItemStyle = {
      color: "#00D1C7"
    }

    return (
      <div className="header desktop-only">
        <Link to={rebuildRouteWithLocale('/', locale)} className="logo">
          <div className="black_logo">
            <Image imageName="Black logo" alt="Ruby on Rails Agency"/>
          </div>
          <Image imageName="Logo" alt="Ruby on Rails Agency"/>
        </Link>

        <div className="menu-right">
          <ul className="menu">
            {collection.map(row =>
              <li key={row._id} className={areRoutesEqual(rebuildRouteWithLocale(row.url, locale), pathname) ? 'active' : null}>
                <Link to={rebuildRouteWithLocale(row.url, locale)}>{row.name[locale]}</Link>
              </li>
            )}
          </ul>

          <nav className="language">
            <DropDownMenu
              value={locale}
              onChange={this.handleLocaleChange}
              className="language-menu"
              selectedMenuItemStyle={selectedMenuItemStyle}
              autoWidth={false}
              >
              {
                localizations.map(row =>
                <MenuItem key={row._id}
                          value={row.locale}
                          primaryText={row.native_name}
                          className="language-menu-item"/>
              )}
            </DropDownMenu>
          </nav>
        </div>
      </div>
    )
  }
}
