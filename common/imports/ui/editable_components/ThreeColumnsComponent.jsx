import React from 'react';

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router';
import Image from '/common/imports/ui/components/Image'
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

// Collections
import { Images } from '/common/imports/collections';

export default class ThreeColumnsComponent extends React.Component {
  render() {
    const { title1, title2, title3, text1, text2, text3, image1, image2, image3, buttonLabel, url, locale } = this.props;

    return (
      <div className='three_columns_component container'>
        <Paper zDepth={3} className='block'>
          <div className='column'>
            <div className='icons'>
              <Image imageId={image1}/>
            </div>
            {
              translationExists(title1, locale)
              ? <h5>{nl2br(title1[locale])}</h5>
              : null
            }
            {
              translationExists(text1, locale)
              ? <h4>{nl2br(text1[locale])}</h4>
              : null
            }
          </div>
          <div className='column'>
            <div className='icons'>
              <Image imageId={image2}/>
            </div>
            {
              translationExists(title2, locale)
              ? <h5>{nl2br(title2[locale])}</h5>
              : null
            }
            {
              translationExists(text2, locale)
              ? <h4>{nl2br(text2[locale])}</h4>
              : null
            }
          </div>
          <div className='column'>
            <div className='icons'>
              <Image imageId={image3}/>
            </div>
            {
              translationExists(title3, locale)
              ? <h5>{nl2br(title3[locale])}</h5>
              : null
            }
            {
              translationExists(text3, locale)
              ? <h4>{nl2br(text3[locale])}</h4>
              : null
            }
          </div>
          {
            translationExists(buttonLabel, locale)
            ? <div className="button_component">
                <FlatButton
                  label={buttonLabel[locale]}
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
    );
  }

  preview() {
    const { title1, title2, title3, text1, text2, text3, image1, image2, image3, buttonLabel, url, locale } = this.props;
    const imageObject1 = Images.findOne(image1)
    const imageObject2 = Images.findOne(image2)
    const imageObject3 = Images.findOne(image3)

    let texts = [];

    translationExists(title1, locale)
    ? texts.push("Title1: "+title1[locale].substring(0, 50))
    : null

    translationExists(title2, locale)
    ? texts.push("Title2: "+title2[locale].substring(0, 50))
    : null

    translationExists(title3, locale)
    ? texts.push("Title3: "+title3[locale].substring(0, 50))
    : null

    translationExists(text1, locale)
    ? texts.push("Text1: "+text1[locale].substring(0, 50))
    : null

    translationExists(text2, locale)
    ? texts.push("Text2: "+text2[locale].substring(0, 50))
    : null

    translationExists(text3, locale)
    ? texts.push("Text3: "+text3[locale].substring(0, 50))
    : null

    translationExists(buttonLabel, locale)
    ? texts.push("ButtonLabel: "+buttonLabel[locale].substring(0, 50))
    : null

    translationExists(url, locale)
    ? texts.push("ButtonUrl: "+url[locale].substring(0, 50))
    : null

    return (
      <div>
        {texts.join(", ")}
        {imageObject1==null ? (image1==null ? "No images defined" : <span className="error">{"Image id:"+image1+" not found"}</span>) : imageObject1.name}
        {imageObject2==null ? (image2==null ? "No images defined" : <span className="error">{"Image id:"+image2+" not found"}</span>) : imageObject2.name}
        {imageObject3==null ? (image3==null ? "No images defined" : <span className="error">{"Image id:"+image3+" not found"}</span>) : imageObject3.name}
      </div>
    )
  }
};

ThreeColumnsComponent.propTypes = {
  title1: translatedStringProp,
  title2: translatedStringProp,
  title3: translatedStringProp,
  text1: translatedStringProp,
  text2: translatedStringProp,
  text3: translatedStringProp,
  image1: imageProp,
  image2: imageProp,
  image3: imageProp,
  buttonLabel: translatedStringProp,
  url: translatedStringProp,
  locale: React.PropTypes.string.isRequired
}
