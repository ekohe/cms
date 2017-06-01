import React from 'react';

// Components
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';
import Image from '/common/imports/ui/components/Image';
import { Images } from '/common/imports/collections';
import CenteredImageComponent from '/common/imports/ui/editable_components/CenteredImageComponent';


// Helpers
import { rebuildRouteWithLocale, areRoutesEqual } from '/common/imports/routing';
import { browserHistory } from 'react-router'

export default class MobileNavigation extends React.Component {
  constructor(props) {
    super(props);
    const { locale, localizations } = this.props;
    const localization = localizations.find(l => l.locale == locale)
    this.state = {value: locale, name: (localization==null ? null : localization.native_name), open: false};
  }

  componentWillReceiveProps(nextProps) {
    const { locale, localizations } = nextProps;
    const localization = localizations.find(l => l.locale == locale)
    this.setState({ value: locale, name: (localization==null ? null : localization.native_name)});
  };

  handleLocalizationChange(event, locale) {
    event.preventDefault()

    const { location } = this.props
    const pathname = location.pathname
    const newPath = rebuildRouteWithLocale(pathname, locale)
    browserHistory.push(newPath)
    return false;
  }

  handleChange(event, locale) {
    event.preventDefault();
    this.setState({value: locale.locale, name: locale.native_name});
    this.handleLocalizationChange(event, locale.locale);
    return false;
  }

  toggleNavigation() {
    this.setState({open: !this.state.open});
  }

  CloseNavigation() {
    if (this.state.open) {
      this.setState({open: !this.state.open});
    } else {
      return
    }
  }
  render() {
    const { dispatch, collection, localizations, subscriptionReady, location, locale, socialLinks, socialIcons, } = this.props;
    const pathname = location.pathname

    const Facebook = Images.find({path: '/e8ad/facebook.svg'}).fetch()[0]
    const Twitter = Images.find({path: '/9a24/twitter.svg'}).fetch()[0]
    const Linkedin = Images.find({path: '/bb89/linkedin.svg'}).fetch()[0]

    if (!subscriptionReady) {
      return null
    }

    return (
      <div className="mobile_navigation">
        <div className={this.state.open ? 'cover' : null}>
          <Link to={rebuildRouteWithLocale('/', locale)}
                className="logo"
                onClick={(event) => { this.CloseNavigation() }}>
            <div className="black_logo">
              <Image imageName="Black logo" />
            </div>
            <Image imageName="Logo"/>
          </Link>
          <div className='toggle-menu'>
            <IconButton onTouchTap={(event) => { this.toggleNavigation() }}>
              <MenuIcon className='open-menu' />
            </IconButton>
            <CloseIcon className='close-menu' onTouchTap={(event) => { this.toggleNavigation() }} />
          </div>
          { this.state.open &&
            <div>
              <nav className="language">
                {
                  localizations.map(row =>
                    <a key={row._id}
                       href="#"
                       className={((locale==row.locale) ? 'active' : null)}
                       onTouchTap={(event) => {
                        this.handleChange(event, row)
                        this.toggleNavigation()
                       }}
                       onClick={(event) => { event.preventDefault(); return false; }}>
                        {row.native_name}
                    </a>
                  )
                }
              </nav>
              <ul className="menu">
                {collection.map(row =>
                  <li key={row._id} className={areRoutesEqual(rebuildRouteWithLocale(row.url, locale), pathname) ? 'active' : null}>
                    <Link to={rebuildRouteWithLocale(row.url, locale)}
                          onClick={(event) => { this.toggleNavigation() }}>
                      {row.name[locale]}
                    </Link>
                  </li>
                )}
              </ul>
              <CenteredImageComponent images={[Facebook._id, Twitter._id, Linkedin._id]}
                                      links={['https://www.facebook.com/ekohe.co', 'https://twitter.com/ekohe', 'https://www.linkedin.com/company/ekohe']}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}
