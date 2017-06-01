import React from 'react';

import Paper from 'material-ui/Paper'
import Image from '/common/imports/ui/components/Image'
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp'
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp'

// Collections
import { Images } from '/common/imports/collections';

// Helpers
import isArray from '/common/imports/helpers/isArray'
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

export default class TwoColumnsComponent extends React.Component {
  render() {
    const { title1, title2, points1, points2, iconTitle1, iconTitle2, icons1, icons2, locale } = this.props;
    return (
      <div className='two_columns_component container'>
        {((isArray(points1) && (points1.length > 0)) ||
          ((isArray(icons1) && (icons1.length > 0)))) &&
        <Paper zDepth={3} className='column'>
          {
            translationExists(title1, locale)
            ? <h2>{nl2br(title1[locale])}</h2>
            : null
          }

          <div className='text'>
            <ol>
              {
                isArray(points1) && points1.map((Point1, index) =>
                  translationExists(Point1, locale)
                  ? <li key={"point1_"+index}><span>{nl2br(Point1[locale])}</span></li>
                  : "null"
                )
              }
            </ol>
          </div>

          {
            translationExists(iconTitle1, locale) && icons1 !=null
            ? <h2>{nl2br(iconTitle1[locale])}</h2>
            : null
          }
          {
            isArray(icons1) && icons1.map((icon1, index) =>
              <div key={"icon1_"+index} className="icons">
                <Image imageId={icon1}/>
              </div>
            )
          }
        </Paper>}
        {((isArray(points2) && (points2.length > 0)) ||
          ((isArray(icons2) && (icons2.length > 0)))) &&
          <Paper zDepth={3} className='column'>
          {
            translationExists(title2, locale)
            ? <h2>{nl2br(title2[locale])}</h2>
            : null
          }
          <div className='text'>
            <ol>
              {
                isArray(points2) && points2.map((Point2, index) =>
                  translationExists(Point2, locale)
                  ? <li key={"point2_"+index}><span>{nl2br(Point2[locale])}</span></li>
                  : "null"
                )
              }
            </ol>
          </div>
          {
            translationExists(iconTitle2, locale) && icons2 !=null
            ? <h2>{nl2br(iconTitle2[locale])}</h2>
            : null
          }
          {
            isArray(icons2) && icons2.map((icon2, index) =>
              <div key={"icon2_"+index} className="icons">
                <Image imageId={icon2}/>
              </div>
            )
          }
        </Paper>}
      </div>
    );
  }

  preview() {
    const { title1, title2, points1, points2, iconTitle1, iconTitle2, icons1, icons2, locale } = this.props;

    let texts = []

    translationExists(title1, locale)
    ? texts.push("Title1: "+title1[locale].substring(0, 50))
    : null

    translationExists(title2, locale)
    ? texts.push("Title2: "+title2[locale].substring(0, 50))
    : null

    translationExists(iconTitle1, locale)
    ? texts.push("IconTitle1: "+iconTitle1[locale].substring(0, 50))
    : null

    translationExists(iconTitle2, locale)
    ? texts.push("IconTitle2: "+iconTitle2[locale].substring(0, 50))
    : null

    translationExists(points1, locale)
    ? texts.push("Points1: "+points1[locale].substring(0, 50))
    : null

    translationExists(points2, locale)
    ? texts.push("Points2: "+points2[locale].substring(0, 50))
    : null

    return (
      <div>
        {texts.join(", ")}<br/>
        {icons1==null ? "0 icon1" : (icons1.length==1 ? "1 icon1" : (icons1.length.toString() + " icons1"))}<br/>
        {icons2==null ? "0 icon2" : (icons2.length==1 ? "1 icon2" : (icons2.length.toString() + " icons2"))}<br/>
      </div>
    )
  }
}

TwoColumnsComponent.propTypes = {
  title1: translatedStringProp,
  title2: translatedStringProp,
  iconTitle1: translatedStringProp,
  iconTitle2: translatedStringProp,
  points1: arrayOfTranslatedStringsProp,
  points2: arrayOfTranslatedStringsProp,
  icons1: arrayOfImagesProp,
  icons2: arrayOfImagesProp,
  locale: React.PropTypes.string.isRequired
}
