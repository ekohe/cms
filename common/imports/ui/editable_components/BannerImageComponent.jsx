import React from 'react';
import { findDOMNode } from 'react-dom';

// Components
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import HardwarePhoneIphone from 'material-ui/svg-icons/hardware/phone-iphone';
import HardwareComputer from 'material-ui/svg-icons/hardware/computer';
import { Link } from 'react-router';
import Image from '/common/imports/ui/components/Image'

// Properties
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp'
import arrayOfStringsProp from '/common/imports/properties/arrayOfStringsProp'
import stringProp from '/common/imports/properties/stringProp'

// Helpers
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

// Collections
import { Images } from '/common/imports/collections';

export default class BannerImageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  numberOfLinks() {
    const { links_labels, links_urls, links_types } = this.props;
    return [(links_labels ? links_labels.length : 0), (links_urls ? links_urls.length : 0), (links_types ? links_types.length : 0)].sort()[2];
  }
  componentDidMount() {
    const bannerNode = findDOMNode(this.bannerTitle)
    if (bannerNode) {
      const elHeight = bannerNode.clientHeight
      this.setState({elHeight})
    }
  }
  render() {
    const { title, image, logo, links_labels, links_urls, links_types, locale } = this.props;

    let marginStyle = {}
    if (this.state.elHeight) {
      marginStyle = {marginTop: '-' + this.state.elHeight/2+'px'}
    }

    // Generate the title and logo elements
    let titleElement = translationExists(title, locale) ?
      <div className="title"
           ref={(el) => this.bannerTitle=el}
           style={marginStyle}>
           {nl2br(title[locale])}
      </div> :
      null
    let logoElement = logo ? <div className="logo"><Image imageId={logo} /></div> : null

    // Generate the background image style
    let imageStyle = {}
    const imageObject = Images.findOne({_id: image})
    if (imageObject!=null) {
      imageStyle = {
        background: "url('"+ Meteor.settings.public.cdn + imageObject.path +"') no-repeat center center"
      }
    }

    // Generate the links
    let links = []
    let icons = []

    if (links_types) {
      icon = links_types.map(type => {
        if (type === 'computer') {
          return <HardwareComputer/>
        } else if (type === 'phone') {
          return <HardwarePhoneIphone/>
        }
      })
    }

    for (let i=0; i<this.numberOfLinks(); i++) {
      if (translationExists(links_labels[i], locale) && translationExists(links_urls[i], locale)) {
        links.push(
          <FlatButton
            key={"link_"+i}
            label={nl2br(links_labels[i][locale])}
            className="white_button"
            icon={icon[i]}
            containerElement={<Link to={links_urls[i][locale]} target="_blank"/>}
          />
        );
      }
    }

    return (
      <div className='banner_component'>
        <div className='banner' style={imageStyle}>
          {titleElement}
          {logoElement}
          {
            translationExists(links_labels, locale) && translationExists(links_urls, locale)
            ? null
            : (
              <div className="links">
                {links}
              </div>
            )
          }
        </div>
      </div>
    );
  }

  preview = () => {
    const { title, image, logo, links_labels, links_urls, links_types, locale } = this.props;
    const imageObject = Images.findOne({_id: image})
    const logoObject = Images.findOne({_id: logo})
    let text = null

    translationExists(title, locale)
    ? text = <span>{"Title: "+title[locale].substring(0, 50)}</span>
    : null

    return (
      <div>
        {text}<br/>
        {imageObject==null ? (image==null ? "No image defined" : "Image id: "+image) : "Banner image: "+imageObject.name}<br/>
        {logoObject==null ? (logo==null ? "No logo defined" : "Logo image id: "+logo) : "Logo: "+logoObject.name}<br/>
        {links_labels==null ? "No link labels defined" : (links_labels.length==1 ? "1 label" : (links_labels.length.toString() + " labels"))}<br/>
        {links_urls==null ? "No url defined" : (links_urls.length==1 ? "1 url" : (links_urls.length.toString() + " urls"))}<br/>
        {links_types==null ? "No types defined" : (links_types.length==1 ? "1 type" : (links_types.length.toString() + " types"))}
      </div>
    )
  }
};

BannerImageComponent.propTypes = {
  image: imageProp,
  title: translatedStringProp,
  logo: imageProp,
  links_labels: arrayOfTranslatedStringsProp,
  links_urls: arrayOfTranslatedStringsProp,
  links_types: arrayOfStringsProp,
  locale: React.PropTypes.string.isRequired
}
