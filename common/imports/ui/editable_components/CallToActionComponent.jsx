import React from 'react';
import { findDOMNode } from 'react-dom';

// UI Components
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router';

import Image from '/common/imports/ui/components/Image'

// Properties
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp'
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

// Collections
import { Images } from '/common/imports/collections';

export default class CallToActionComponent extends React.Component {
  numberOfActions() {
    const { icons, texts, button_labels, links, locale } = this.props;
    return [(icons ? icons.length : 0), (texts ? texts.length : 0), (button_labels ? button_labels.length : 0), (links ? links.length : 0)].sort()[3];
  }

  constructor(props) {
    super(props)
    this.state = {
      callToActionsInner: [],
      Height: [],
    }
  }

  componentDidMount() {
    let heights = this.state.callToActionsInner.map( item =>
      findDOMNode(item).clientHeight
    )
    Height = heights[0] > heights[1] ? heights[0] : heights[1]
    this.setState({Height})
  }

  setRef(el) {
    this.state.callToActionsInner.push(el)
  }

  render() {
    const { icons, texts, button_labels, links, heightStyle, locale } = this.props;

    const count = this.numberOfActions()
    let callToActions = []

    for (var i=0; i<count; i++) {
      callToActions.push({
          icon: (icons ? icons[i] : null),
          text: (texts ? texts[i] : null),
          button_label: (button_labels ? button_labels[i] : null),
          link: (links ? links[i] : null)
        }
      );
    }

    if (callToActions.length==0) {
      return null
    }

    let myClassNames = ['call_to_action_component container']
    if (callToActions.length == 1) {
      myClassNames.push('one_action')
    }

    return (
      <div className={myClassNames.join(' ')}>
        <Paper zDepth={3} className='block'>
          {callToActions.map((callToAction, index) =>
            <div key={"call_to_action_"+index} className="call_to_action">
              <div className="inner" ref={(el)=>this.setRef(el)} style={{height: this.state.Height + 'px'}}>
                {callToAction.icon &&
                  <div className='icons'>
                    <Image imageId={callToAction.icon}/>
                  </div>
                }

                {
                  translationExists(callToAction.text, locale)
                  ? <div className='text'>{nl2br(callToAction.text[locale])}</div>
                  : null
                }
              </div>

              {
                translationExists(callToAction.button_label, locale) && translationExists(callToAction.link, locale)
                ? (
                    <div className='button_component'>
                      <FlatButton
                        className='primary_button btn-3d btn-3db'
                        label={nl2br(callToAction.button_label[locale])}
                        containerElement={<Link to={callToAction.link[locale]}/>}
                      />
                    </div>
                  )
                : null
              }
            </div>
          )}
        </Paper>
      </div>
    );
  }

  preview() {
    const { icons, texts, button_labels, links, locale } = this.props;

    return (
      <div>
        {icons==null ? "0 icon" : (icons.length==1 ? "1 icon" : (icons.length.toString() + " icons"))}<br/>
        {texts==null ? "0 text" : (texts.length==1 ? "1 text" : (texts.length.toString() + " texts"))}<br/>
        {button_labels==null ? "0 button label" : (button_labels.length==1 ? "1 button label" : (button_labels.length.toString() + " button labels"))}<br/>
        {links==null ? "0 link" : (links.length==1 ? "1 link" : (links.length.toString() + " links"))}
      </div>
    )
  }
};

CallToActionComponent.propTypes = {
  icons: arrayOfImagesProp,
  texts: arrayOfTranslatedStringsProp,
  button_labels: arrayOfTranslatedStringsProp,
  links: arrayOfTranslatedStringsProp,
  locale: React.PropTypes.string.isRequired
}
