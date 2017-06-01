import React from 'react';
import Image from '/common/imports/ui/components/Image'
import imageProp from '/common/imports/properties/imageProp'
import { Images } from '/common/imports/collections';
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp'

export default class FilmstripGalleryComponent extends React.Component {
  render() {
    const { images, locale } = this.props;

    return (
      <div className='filmstrip_gallery_component scroll'>
        <div className='filmstrip'>
          {
            images ? images.map((image, index) =>
              <span key={index}>
                <Image imageId={image}/>
              </span>
            ) : null
          }
        </div>
      </div>
    );
  }

  preview() {
    const { images, locale } = this.props;

    return (
      <div>
        {images==null ? "0 image" : (images.length==1 ? "1 image" : (images.length.toString() + " images"))}<br/>
      </div>
    )
  }
};

FilmstripGalleryComponent.propTypes = {
  images: arrayOfImagesProp,
  locale: React.PropTypes.string.isRequired
}
