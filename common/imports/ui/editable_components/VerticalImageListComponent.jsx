import React from 'react';

import Image from '/common/imports/ui/components/Image'
// Properties
import imageProp from '/common/imports/properties/imageProp'
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import translationExists from '/common/imports/helpers/translationExists'
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp'
// Collections
import { Images } from '/common/imports/collections';

export default class VerticalImageListComponent extends React.Component {
  numberOfActions() {
    const { images1, images2, images3, locale } = this.props;
    return[(images1 ? images1.length : 0), (images2 ? images2.length : 0), (images3 ? images3.length : 0)].sort()[2];
  }

  render() {
    const { title1, title2, title3, images1, images2, images3, locale } = this.props;

    const count = this.numberOfActions()
    let verticalImageLists = []

    for (var i=0; i<count; i++) {
      verticalImageLists.push({
          agency: (images1 ? images1[i] : null),
          corporate: (images2 ? images2[i] : null),
          startup: (images3 ? images3[i] : null),
        }
      );
    }

    if (verticalImageLists.length==0) {
      return null
    }

    return (
      <div className="vertical_image_list_component container">
        <div className='column'>
          <h5>{title1[locale]}</h5>
            {verticalImageLists.map((verticalImageList, index) =>
              <div key={"agency_"+index} className='logos'>
                <Image imageId={verticalImageList.agency}/>
              </div>
            )}
        </div>
        <div className='column'>
          <h5>{title2[locale]}</h5>
            {verticalImageLists.map((verticalImageList, index) =>
              <div key={"corporate_"+index} className='logos'>
                <Image imageId={verticalImageList.corporate}/>
              </div>
            )}
        </div>
        <div className='column'>
          <h5>{title3[locale]}</h5>
          {verticalImageLists.map((verticalImageList, index) =>
            <div key={"startup_"+index} className='logos'>
              <Image imageId={verticalImageList.startup}/>
            </div>
          )}
        </div>
    </div>
    );
  }

  preview() {
    const { title1, title2, title3, images1, images2, images3, locale } = this.props;

    let texts = [];

    translationExists(title1, locale)
    ? texts.push("title1: "+title1[locale].substring(0, 50))
    : null

    translationExists(title2, locale)
    ? texts.push("title2: "+title2[locale].substring(0, 50))
    : null

    translationExists(title3, locale)
    ? texts.push("title3: "+title3[locale].substring(0, 50))
    : null

    return (
      <div>
        {texts.join(", ")}
        {images1==null ? "0 agency" : (images1.length==1 ? "1 agency" : (images1.length.toString() + " agencys"))}<br/>
        {images2==null ? "0 corporate" : (images2.length==1 ? "1 corporate" : (images2.length.toString() + " corporates"))}<br/>
        {images3==null ? "0 startup" : (images3.length==1 ? "1 startup" : (images3.length.toString() + " startups"))}<br/>

      </div>
    )
  }
};

VerticalImageListComponent.propTypes = {
  title1: translatedStringProp,
  title2: translatedStringProp,
  title3: translatedStringProp,
  images1: arrayOfImagesProp,
  images2: arrayOfImagesProp,
  images3: arrayOfImagesProp,
  locale: React.PropTypes.string.isRequired
}
