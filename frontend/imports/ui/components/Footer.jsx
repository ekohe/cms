import React from 'react';

// Components
import Image from '/common/imports/ui/components/Image';
import { Link } from 'react-router';

import CenteredImageComponent from '/common/imports/ui/editable_components/CenteredImageComponent'

// Helpers
import { rebuildRouteWithLocale, areRoutesEqual } from '/common/imports/routing';
import { browserHistory } from 'react-router'

import { Images } from '/common/imports/collections'

export default class Footer extends React.Component {
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

  handleChange(event, locale) {
    const { localizations } = this.props;
    this.setLocale(locale.locale, localizations);
    this.handleLocalizationChange(event, locale.locale);
  };


  handleLocalizationChange(event, locale) {
    event.preventDefault()

    const { location } = this.props
    const pathname = location.pathname
    const newPath = rebuildRouteWithLocale(pathname, locale)
    browserHistory.push(newPath)
    return false;
  };

  render() {
    const { dispatch, collection, localizations, subscriptionReady, location, locale } = this.props;
    const pathname = location.pathname

    if (!subscriptionReady) {
      return null
    }
    const copyRight = {
      'en': 'Privacy Policy',
      'fr': 'Politique de confidentialité',
      'cn': '隐私政策',
      'jp': 'プライバシーポリシー'
    }
    const socialIconsNames = ["Grey Linkedin Icon", "Grey Facebook Icon", "Grey Twitter Icon"]
    const socialIcons = socialIconsNames.map( name =>
      Images.findOne({ name: name })
    ).filter(image => (image!==undefined))

    const socialLinks = ['https://www.linkedin.com/company/ekohe', 'https://www.facebook.com/ekohe.co','https://twitter.com/ekohe']

    const urlHasMailTo = function(url) {
      if (typeof(url)=='undefined') {
        return false
      } else {
        return url.match(/^mailto:/)
      }
    }

    return (
      <div className="footer">
        <div className="menu-content">
          {collection.map(row =>
            <div key={row._id} className={areRoutesEqual(rebuildRouteWithLocale(row.url, locale), pathname) ? 'active menu-item' : '' + 'menu-item'}>
              <Link to={rebuildRouteWithLocale(row.url, locale)} className="title">{row.name[locale]}</Link>
              <ul className="sub-menu">
                {
                  (row.children||[]).sort((a, b) => a.position - b.position).map(child =>
                    <li key={child._id}>
                      {urlHasMailTo(child.url) ? <a href={child.url}>{child.name[locale]}</a> : <Link to={rebuildRouteWithLocale(child.url, locale)}>{child.name[locale]}</Link>}
                    </li>
                  )
                }
              </ul>
            </div>
          )}
          <CenteredImageComponent links={socialLinks}
                                  images={socialIcons.map(icon=>icon._id)}
          />
        </div>
        <div className="copy-right">
          <div className="pull-left">
            <Link to={rebuildRouteWithLocale('/privacy', locale)}>
              {copyRight[locale]}
            </Link>
          </div>
          <div className="pull-right">
            {"Copyright © "+(new Date()).getFullYear()+" Ekohe Limited"}
          </div>
        </div>
      </div>
    )
  }
}
