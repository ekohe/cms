import React from 'react';

import imageProp from '/common/imports/properties/imageProp';
import Image from '/common/imports/ui/components/Image';
import translatedStringProp from '/common/imports/properties/translatedStringProp';
import translationExists from '/common/imports/helpers/translationExists';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp';

// Collections
import { Images } from '/common/imports/collections';

export default class IconsSetComponent extends React.Component {
  numberOfIconsSet() {
    const { titles, icons, locale } = this.props;
    return [(titles ? titles.length : 0), (icons ? icons.length : 0)].sort()[1];
  }

  render() {
    const { titles, icons, locale } = this.props;
    const count = this.numberOfIconsSet()

    let IconsSets = []

    for (var i=0; i<count; i++) {
      IconsSets.push({
          title: (titles ? titles[i] : null),
          icon: (icons ? icons[i] : null)
        }
      );
    }

    if (IconsSets.length==0) {
      return null
    }

    let myClassNames = ['icons_set_component container']
    if (IconsSets.length <= 4) {
      myClassNames.push('four_icons')
    }

    return (
      <div className={myClassNames.join(' ')}>
        {IconsSets.map((IconsSet, index) =>
          <div key={"IconsSets"+index} className="IconsSet">
            <Image imageId={IconsSet.icon}/>
            {
              translationExists(IconsSet.title, locale)
              ? <div className='title'>{IconsSet.title[locale]}</div>
              : null
            }

          </div>
        )}
      </div>
    );
  }

  preview() {
    const { icons, titles, locale } = this.props;

    return (
      <div>
        {titles==null ? "0 title" : (titles.length==1 ? "1 title" : (titles.length.toString() + " titles"))}<br/>
        {icons==null ? "0 icon" : (icons.length==1 ? "1 icon" : (icons.length.toString() + " icons"))}<br/>
      </div>
    )
  }
}

IconsSetComponent.propTypes = {
  titles: arrayOfTranslatedStringsProp,
  icons: arrayOfImagesProp,
  locale: React.PropTypes.string.isRequired
}
