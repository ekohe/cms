import React from 'react';

// Properties
import imageProp from '/common/imports/properties/imageProp'
import stringProp from '/common/imports/properties/stringProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

// Properties
import booleanProp from '/common/imports/properties/booleanProp'

import { Images } from '/common/imports/collections';

export default class TextImageSideBySideComponent extends React.Component {
  render() {
    const { title, subtitle, text, image, locale, componentClass, imageToTheRightPosition } = this.props;
    const imageObject = Images.findOne(image)
    const rightClass = imageToTheRightPosition ? ' right' : ''

    return (
      <div className={'text_image_side_by_side_component container'+rightClass+(componentClass ? (' '+componentClass) : '')}>
        <div className='side_text'>
          {
            translationExists(title, locale)
            ? <div className='title'>{nl2br(title[locale])}</div>
            : null
          }
          {
            translationExists(subtitle, locale)
            ? <div className='subtitle'>{nl2br(subtitle[locale])}</div>
            : null
          }
          {
            translationExists(text, locale)
            ? <p>{nl2br(text[locale])}</p>
            : null
          }
        </div>
        <div className='side_image'>
          {imageObject && <img src={Meteor.settings.public.cdn + imageObject.path} alt={imageObject.name}/> }
        </div>
      </div>
    );
  }

  preview = () => {
    const { title, subtitle, text, image, imageToTheRightPosition, locale } = this.props;
    const imageObject = Images.findOne(image)

    let texts = [];

    translationExists(title, locale)
    ? texts.push("Title: "+title[locale].substring(0, 50))
    : null

    translationExists(subtitle, locale)
    ? texts.push("Subtitle: "+subtitle[locale].substring(0, 50))
    : null

    translationExists(text, locale)
    ? texts.push("Text: "+text[locale].substring(0, 50))
    : null

    let position = "Image on the left"
    if (imageToTheRightPosition) { position = "Image on the right"}

    return (
      <div>
        {imageObject==null ? (image==null ? "No images defined" : "Image id: "+image) : "Image: "+imageObject.name}
        <br/>
        {texts.join(", ")}
        <br/>
        {position}
      </div>
    )
  }
};

TextImageSideBySideComponent.propTypes = {
  image: imageProp,
  title: translatedStringProp,
  subtitle: translatedStringProp,
  text: translatedStringProp,
  imageToTheRightPosition: booleanProp,
  componentClass: stringProp,
  locale: React.PropTypes.string.isRequired,
}
