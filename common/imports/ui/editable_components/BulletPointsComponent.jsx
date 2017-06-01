import React from 'react';

// Properties
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

export default class BulletPointsComponent extends React.Component {
  render() {
    const { title, points, locale } = this.props;

    return (
      <div className='bullet_points_component'>
        {
          translationExists(title, locale)
          ? <h4>{nl2br(title[locale])}</h4>
          : null
        }
        <ol>
          {
            points.map((bulletPoint, index) =>
              translationExists(bulletPoint, locale)
              ? <li key={"bullet_point_"+index}><span>{nl2br(bulletPoint[locale])}</span></li>
              : "null"
            )
          }
        </ol>
      </div>
    );
  }

  preview = () => {
    const { title, points, locale } = this.props;

    let texts = []

    translationExists(title, locale)
    ? texts.push("Title: "+title[locale].substring(0, 50))
    : null

    translationExists(points, locale)
    ? texts.push("Points: "+points[locale].substring(0, 50))
    : null

    return (
      <div>{texts.join(", ")}</div>
    )
  }
};

BulletPointsComponent.propTypes = {
  title: translatedStringProp,
  points: arrayOfTranslatedStringsProp,
  locale: React.PropTypes.string.isRequired
}
