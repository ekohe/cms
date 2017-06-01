import React from 'react';

// Properties
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';

// Helpers
import translationExists from '/common/imports/helpers/translationExists';
import nl2br from '/common/imports/helpers/nl2br'

// Components
import Paper from 'material-ui/Paper'
import { Images } from '/common/imports/collections';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import PlaceIcon from 'material-ui/svg-icons/maps/place'

export default class JobCardComponent extends React.Component {
  render() {
    const { image, title, text, element, button_label, url, cities_available, cities, locale } = this.props;
    const imageObject = Images.findOne(image)



    let imageElement = null

    if (imageObject!=null) {
      const imageStyle = {
        background: "url('"+ Meteor.settings.public.cdn + imageObject.path +"') no-repeat center center"
      }
      imageElement = <div className='card' style={imageStyle}></div>
    }

    const { maxHeight } = this.props

    let heightStyle = maxHeight > 0 ? ({height: maxHeight +'px'}) : null

    return (
      <div className='job_card_component'>
        <Paper zDepth={3} className='block' style={heightStyle}>
          <Link to={url[locale]}>
            {imageElement}
            {
              translationExists(button_label, locale) && translationExists(url, locale)
              ? (
                  <div className="hidden_button">
                    <FlatButton
                    className='white_button'
                    label={button_label[locale]}
                    />
                  </div>
                )
              : null
            }
          </Link>


          <div className="inner">
            {
              translationExists(title, locale)
              ? <h2>{title[locale]}</h2>
              : null
            }
            {
              translationExists(title, locale)
              ? <h4>{nl2br(text[locale])}</h4>
              : null
            }

            {
              (cities_available != null && cities_available != '')
              ? (
                  <p>
                    <PlaceIcon/>
                    {cities_available[locale]}
                    &nbsp;
                    {cities}
                  </p>

                )
              : null
            }
          </div>
        </Paper>
      </div>
    );
  }

  preview() {
    const { image, title, text, button_label, url, cities, locale } = this.props;
    return null
  }
}

JobCardComponent.propTypes = {
  image: imageProp,
  title: translatedStringProp,
  text: translatedStringProp,
  button_label: translatedStringProp,
  url: translatedStringProp,
  cities: stringProp,
  locale: React.PropTypes.string.isRequired
}
