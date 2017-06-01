import React from 'react';

import imageProp from '/common/imports/properties/imageProp';
import Image from '/common/imports/ui/components/Image';
import { Link } from 'react-router';
import { rebuildRouteWithLocale } from '/common/imports/routing';
import translatedStringProp from '/common/imports/properties/translatedStringProp';
import translationExists from '/common/imports/helpers/translationExists';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp';

// Collections
import { Images } from '/common/imports/collections';

export default class IconsSetUrlsComponent extends React.Component {
  numberOfIconsSet() {
    const { titles, icons, urls, locale } = this.props;
    return [(titles ? titles.length : 0), (icons ? icons.length : 0), (urls ? urls.length : 0)].sort()[2];
  }

  render() {
    const { titles, icons, urls, locale } = this.props;
    const count = this.numberOfIconsSet()

    let iconsSetUrls = []

    for (var i=0; i<count; i++) {
      iconsSetUrls.push({
          title: (titles ? titles[i] : null),
          icon: (icons ? icons[i] : null),
          url: (urls ? urls[i] : null)
        }
      );
    }

    if (iconsSetUrls.length==0) {
      return null
    }

    let myClassNames = ['icons_set_urls_component container']
    if (iconsSetUrls.length <= 4) {
      myClassNames.push('four_icons')
    }

    return (
      <div className={myClassNames.join(' ')}>
        {iconsSetUrls.map((iconsSetUrl, index) =>
          <Link to={rebuildRouteWithLocale(iconsSetUrl.url[locale], locale)} key={"iconsSetUrls"+index} className="IconsSet">
            <Image imageId={iconsSetUrl.icon}/>
            {
              translationExists(iconsSetUrl.title, locale)
              ? <div className='title'>{iconsSetUrl.title[locale]}</div>
              : null
            }
          </Link>
        )}
      </div>
    );
  }

  preview() {
    const { icons, titles, urls, locale } = this.props;

    return (
      <div>
        {titles==null ? "0 title" : (titles.length==1 ? "1 title" : (titles.length.toString() + " titles"))}<br/>
        {icons==null ? "0 icon" : (icons.length==1 ? "1 icon" : (icons.length.toString() + " icons"))}<br/>
        {urls==null ? "0 url" : (urls.length==1 ? "1 url" : (urls.length.toString() + " urls"))}<br/>
      </div>
    )
  }
}

IconsSetUrlsComponent.propTypes = {
  titles: arrayOfTranslatedStringsProp,
  icons: arrayOfImagesProp,
  urls: arrayOfTranslatedStringsProp,
  locale: React.PropTypes.string.isRequired
}
