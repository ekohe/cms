import React from 'react';

import Paper from 'material-ui/Paper'
import Image from '/common/imports/ui/components/Image'
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp'

// Helpers
import stringProp from '/common/imports/properties/stringProp'
import translationExists from '/common/imports/helpers/translationExists';
import nl2br from '/common/imports/helpers/nl2br'

// Collections
import { Images } from '/common/imports/collections';

export default class PaperContentComponent extends React.Component {
  render() {
    const { title, subtitle, text, icons, anchorLink, locale } = this.props;
    return (
      <div className='paper_content_component container'>
        <Paper zDepth={3} className='block'>
          {
            anchorLink
            ? <a name={anchorLink}></a>
            :null
          }
          {
            translationExists(title, locale)
            ? <h1><span>{nl2br(title[locale])}</span></h1>
            : null
          }
          {
            translationExists(text, locale)
            ? <p>{nl2br(text[locale])}</p>
            : null
          }
          {
            icons ? icons.map((icon, index) =>
              <div key={"icon"+index} className="icons">
                <Image imageId={icon}/>
              </div>
            ) : null
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
    const { title, subtitle, text, icons, locale } = this.props;

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
      <div>
        {texts.join(", ")}<br/>
        {icons==null ? "0 icons" : (icons.length==1 ? "1 icon" : (icons.length.toString() + " icons"))}<br/>
      </div>
    )
  }
}

PaperContentComponent.propTypes = {
  title: translatedStringProp,
  subtitle: translatedStringProp,
  text: translatedStringProp,
  icons: arrayOfImagesProp,
  anchorLink: stringProp,
  locale: React.PropTypes.string.isRequired
}
