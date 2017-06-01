import React from 'react';
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import translationExists from '/common/imports/helpers/translationExists'
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export default class ButtonComponent extends React.Component {
  render() {
    const { title, url, locale } = this.props;

    return (
      translationExists(title, locale) && translationExists(url, locale)
      ? (
          <div className='button_component'>
            <FlatButton
              label={title[locale]}
              containerElement={<Link to={url[locale]}/>}
              className='primary_button btn-3d btn-3db'
            />
          </div>
        )
      : null
    )
  }

  preview() {
    const { title, url, locale } = this.props;

    let titleText = null
    translationExists(title, locale)
    ? titleText = <span>{"Title: "+title[locale].substring(0, 50)}</span>
    : null

    let urlText = null
    translationExists(url, locale)
    ? urlText = <span>{"URL: "+url[locale]}</span>
    : null

    return (<div>{titleText}<br/>{urlText}</div>)
  }
};

ButtonComponent.propTypes = {
  title: translatedStringProp,
  url: translatedStringProp,
  locale: React.PropTypes.string.isRequired
}
