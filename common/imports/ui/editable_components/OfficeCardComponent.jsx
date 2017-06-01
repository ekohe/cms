import React from 'react';

// Properties
import imageProp from '/common/imports/properties/imageProp';
import translatedStringProp from '/common/imports/properties/translatedStringProp';
import stringProp from '/common/imports/properties/stringProp';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';

// Helpers
import translationExists from '/common/imports/helpers/translationExists';
import nl2br from '/common/imports/helpers/nl2br';

// Components
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { Images } from '/common/imports/collections';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import CallIcon from 'material-ui/svg-icons/communication/call';
import EmailIcon from 'material-ui/svg-icons/communication/email';

export default class OfficeCardComponent extends React.Component {
  render() {
    const { image, title, address, local_address, button_label, url, phone_number, slug, email, locale } = this.props;
    const imageObject = Images.findOne(image)

    let imageElement = null

    if (imageObject!=null) {
      const imageStyle = {
        background: "url('"+ Meteor.settings.public.cdn + imageObject.path +"') no-repeat center center"
      }
      imageElement = <div className='card' style={imageStyle}></div>
    }

    const { maxHeight } = this.props

    let heightStyle = maxHeight > 0 ? ({height: maxHeight - 30 +'px'}) : null

    return (
      <div className='office_card_component'>
        <Paper zDepth={3} className='block' style={heightStyle}>
          <Link to={url}>

            {imageElement}
            {
              (button_label!=null )
              ? (
                  <div className="hidden_button">
                    <FlatButton
                    className='white_button'
                    label={button_label}
                    />
                  </div>
                )
              : null
            }
          </Link>

          <div className="inner">
            {
              translationExists(title, locale)
              ? <h2>{nl2br(title[locale])}</h2>
              : null
            }
            {
              (address!=null && address!="")
              ? <h4>
                  <PlaceIcon/>
                  {nl2br(address)}
                </h4>
              : null
            }
            {
              (local_address!=null && local_address!="")
              ? <h4 className={nl2br(slug)}>
                  <PlaceIcon/>
                  {nl2br(local_address)}
                </h4>
              : null
            }
            {
              (phone_number!=null && phone_number!="")
              ? <h4>
                  <CallIcon/>
                  {phone_number}
                </h4>
              : null
            }
            {
              (email!=null && email!="")
              ? <h4>
                  <EmailIcon/>
                  {email}
                </h4>
              : null
            }
          </div>
        </Paper>
      </div>
    );
  }

  preview() {
    const { image, title, address, local_address, button_label, url, phone_number, locale } = this.props;
    return(
      <div>

      </div>
    )
  }
}

OfficeCardComponent.propTypes = {
  image: imageProp,
  title: translatedStringProp,
  address: stringProp,
  local_address: stringProp,
  button_label: translatedStringProp,
  url: stringProp,
  phone_number: stringProp,
  slug: stringProp,
  email: stringProp,
  locale: React.PropTypes.string.isRequired
}
