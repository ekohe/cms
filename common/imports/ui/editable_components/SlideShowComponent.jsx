import React from 'react';

import Slider from 'react-slick';
import Image from '/common/imports/ui/components/Image';
import { Images } from '/common/imports/collections';

import CenteredImageComponent from './CenteredImageComponent'

// Properties
import imageProp from '/common/imports/properties/imageProp';
import arrayOfImagesProp from '/common/imports/properties/arrayOfImagesProp';

// Icons
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import KeyboardArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

class PrevArrow extends React.Component {
  render() {
    return (
      <div {...this.props} ><KeyboardArrowLeftIcon /></div>
    );
  }
}

class NextArrow extends React.Component {
  render() {
    return (
      <div {...this.props} ><KeyboardArrowRightIcon /></div>
    );
  }
}

export default class SlideShowComponent extends React.Component {
  render() {
    const { images, locale} = this.props;

    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      veticalMode: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    return (
      <div className='container'>
        <div className='slide_show_component'>
          {images==null
            ?
              null
              :
              (
                images.length > 1
                ?
                <Slider {...settings}>
                  {images.map((slide_image, index) =>
                    <div key={"slide_show_"+index} className="slide">
                      <Image imageId={slide_image}/>
                    </div>
                  )}
                </Slider>
                :
                <CenteredImageComponent images={images}/>
            )
          }
        </div>
      </div>
    );
  }

  preview() {
    const { images, locale} = this.props;

    return (
      <div>
        {images==null ? "0 image" : (images.length==1 ? "1 image" : (images.length.toString() + " images"))}<br/>
      </div>
    )
  }
};

SlideShowComponent.propTypes = {
  images: arrayOfImagesProp,
  locale: React.PropTypes.string.isRequired
}
