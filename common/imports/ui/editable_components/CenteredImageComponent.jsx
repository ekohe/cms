import React from 'react';

import Image from '/common/imports/ui/components/Image';
import { Images } from '/common/imports/collections';
import { Link } from 'react-router';
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp';
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp';
import arrayOfStringsProp from '/common/imports/properties/arrayOfStringsProp';

export default class CenteredImageComponent extends React.Component {
  numberOfImagesSet() {
    const { links, images } = this.props;
    return [(links ? links.length : 0), (images ? images.length : 0)].sort()[1];
  }

  render() {
    const { links, images } = this.props;
    const count = this.numberOfImagesSet()

    let ImagesSets = []

    for (var i=0; i<count; i++) {
      ImagesSets.push({
          link: (links ? links[i] : null),
          image: (images ? images[i] : null)
        }
      );
    }

    if (ImagesSets.length==0) {
      return null
    }

    let myClassNames = ['centered_image']
    if (ImagesSets.length >= 2) {
      myClassNames.push('icons')
    }

    return (
      <div className={myClassNames.join(' ')}>
        {ImagesSets.map((ImagesSet, index) =>
          <div key={"ImagesSets"+index} className="ImagesSet">
            <a href={ImagesSet.link} target="_blank"><Image imageId={ImagesSet.image}/></a>
          </div>
        )}
      </div>
    );
  }

  preview = () => {
    const { images, links, locale } = this.props;
    return (
      <div>
        {links==null ? "0 link" : (links.length==1 ? "1 link" : (links.length.toString() + " links"))}<br/>
        {images==null ? "0 image" : (images.length==1 ? "1 image" : (images.length.toString() + " images"))}<br/>
      </div>
    )
  }
};

CenteredImageComponent.propTypes = {
  images: arrayOfImagesProp,
  links: arrayOfStringsProp,
}
