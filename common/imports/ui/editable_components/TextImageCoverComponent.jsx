import React from 'react';

import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

import { Images } from '/common/imports/collections';
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'

export default class TextImageCoverComponent extends React.Component {
  render() {
    const { image, caption, title, text, buttonLabel, url, locale } = this.props;
    const imageObject = Images.findOne(image)

    if (imageObject!=null) {
      const imageStyle = {
        background: "url('"+ Meteor.settings.public.cdn + imageObject.path +"') no-repeat center center"
      }
      imageElement = <div className='cover' style={imageStyle}></div>
    }

    return (
      <div className='text_image_cover_component'>
        {imageElement}
        <div className='container'>
          <Paper zDepth={3} className='block'>
            {
              translationExists(caption, locale)
              ? <div className='caption'>{nl2br(caption[locale])}</div>
              : null
            }
            {
              translationExists(title, locale)
              ? <h1><span>{nl2br(title[locale])}</span></h1>
              : null
            }
            {
              translationExists(text, locale)
              ? <h2>{nl2br(text[locale])}</h2>
              : null
            }
            {
              translationExists(buttonLabel, locale) && translationExists(url, locale)
              ? <div className="button_component">
                  <FlatButton
                    label={nl2br(buttonLabel[locale])}
                    containerElement={<Link to={url[locale]}/>}
                    className='primary_button btn-3d btn-3db'
                  />
                </div>
              : null
            }
          </Paper>
          <Paper zDepth={3} className='transparent'>
            <div className='css3-shadow'>
            </div>
          </Paper>
        </div>
      </div>
    );
  }

  preview = () => {
    const { image, caption, title, text, buttonLabel, url, locale } = this.props;
    const imageObject = Images.findOne(image)

    let texts = [];

    translationExists(caption, locale)
    ? texts.push("caption: "+caption[locale].substring(0, 50))
    : null

    translationExists(title, locale)
    ? texts.push("Title: "+title[locale].substring(0, 50))
    : null

    translationExists(text, locale)
    ? texts.push("Text: "+text[locale].substring(0, 50))
    : null

    translationExists(buttonLabel, locale)
    ? texts.push("ButtonLabel: "+buttonLabel[locale].substring(0, 50))
    : null

    translationExists(url, locale)
    ? texts.push("Url: "+url[locale].substring(0, 50))
    : null

    return (
      <div>
        {imageObject==null ? (image==null ? "No images defined" : <span className="error">{"Image id:"+image+" not found"}</span>) : "Cover image: "+imageObject.name}
        {texts.join(", ")}
      </div>
    )
  }
};

TextImageCoverComponent.propTypes = {
  image: imageProp,
  caption: translatedStringProp,
  title: translatedStringProp,
  text: translatedStringProp,
  buttonLabel: translatedStringProp,
  url: translatedStringProp,
  locale: React.PropTypes.string.isRequired,
}
