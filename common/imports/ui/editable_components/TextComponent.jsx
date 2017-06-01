import React from 'react'
import Linkify from 'react-linkify'

// Properties
import stringProp from '/common/imports/properties/stringProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

export default class TextComponent extends React.Component {
  render() {
    const { title, subtitle, text, componentClass, anchorLink, locale } = this.props;

    let elements = [];

    translationExists(title, locale)
    ? elements.push(<h1 key="title"><span>{nl2br(title[locale])}</span></h1>)
    : null

    translationExists(subtitle, locale)
    ? elements.push(<Linkify key="subtitle"><h2>{nl2br(subtitle[locale])}</h2></Linkify>)
    : null

    translationExists(text, locale)
    ? elements.push(<Linkify key="text"><div className="description">{nl2br(text[locale])}</div></Linkify>)
    : null

    return (
      <div className={'text_component'+(componentClass ? (' '+componentClass) : '')}>
        {
          anchorLink
          ? <a name={anchorLink}></a>
          :null
        }
        {elements}
      </div>
      );
  }

  preview = () => {
    const { title, subtitle, text, locale } = this.props;

    let texts = []

    translationExists(title, locale)
    ? texts.push("Title: "+title[locale].substring(0, 50))
    : null

    translationExists(subtitle, locale)
    ? texts.push("Subtitle: "+subtitle[locale].substring(0, 50))
    : null

    translationExists(text, locale)
    ? texts.push("Text: "+text[locale].substring(0, 50))
    : null

    return (
      <div>{texts.join(", ")}</div>
    )
  }
};

TextComponent.propTypes = {
  title: translatedStringProp,
  subtitle: translatedStringProp,
  text: translatedStringProp,
  componentClass: stringProp,
  anchorLink: stringProp,
  locale: React.PropTypes.string.isRequired
}
