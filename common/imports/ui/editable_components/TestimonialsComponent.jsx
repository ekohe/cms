import React from 'react';
import translatedStringProp from '/common/imports/properties/translatedStringProp';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

export default class TestimonialsComponent extends React.Component {
  numberOfTestimonials() {
    const { texts, names, locale } = this.props;
    return [(texts ? texts.length : 0), (names ? names.length : 0)].sort()[1];
  }

  render() {
    const { title, texts, names , locale } = this.props;
    const count = this.numberOfTestimonials()
    let Testimonials = []

    for (var i=0; i<count; i++) {
      Testimonials.push({
          text: (texts ? texts[i] : null),
          name: (names ? names[i] : null)
        }
      );
    }

    return (
      <div className='testimonials_component container'>
        {
          translationExists(title, locale)
          ? <h1><span>{nl2br(title[locale])}</span></h1>
          : null
        }
        {Testimonials.map((Testimonial, index) =>
          <div key={"testimonials"+index} className="testimonials">
            {
              translationExists(Testimonial.text, locale)
              ? <div className='text'>{nl2br(Testimonial.text[locale])}</div>
              : null
            }
            {
              translationExists(Testimonial.name, locale)
              ? <div className='name'>{nl2br(Testimonial.name[locale])}</div>
              : null
            }
          </div>
        )}
      </div>
    );
  }

  preview() {
    const { title, texts, names , locale } = this.props;
    return(
      <div>
        {
          translationExists(title, locale)
          ? texts.push("Title: "+title[locale].substring(0, 50))
          : null
        }<br/>
        {texts==null ? "0 text" : (texts.length==1 ? "1 text" : (texts.length.toString() + " texts"))}<br/>
        {names==null ? "0 name" : (names.length==1 ? "1 name" : (names.length.toString() + " names"))}<br/>
      </div>
    )
  }
}

TestimonialsComponent.propTypes = {
  title: translatedStringProp,
  texts: arrayOfTranslatedStringsProp,
  names: arrayOfTranslatedStringsProp,
  locale: React.PropTypes.string.isRequired
}
