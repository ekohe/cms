import React from 'react';
import { findDOMNode } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

// Collections
import { Images } from '/common/imports/collections';
import Offices from '/common/imports/collections/offices';

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing';

// Components
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import OfficeCardComponent from './OfficeCardComponent';

import translatedStringProp from '/common/imports/properties/translatedStringProp';

class OfficesCardsComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      officeCards: [],
      firstHeight: 0,
      secondHeight: 0
    }
  }

  componentDidMount() {

    let heights = this.state.officeCards.map( item =>
      findDOMNode(item).clientHeight
    )
    firstHeight = heights[0] > heights[1] ? heights[0] : heights[1]
    secondHeight = heights[2] > heights[3] ? heights[2] : heights[3]

    this.setState({firstHeight, secondHeight})
  }

  setRef(el) {
    this.state.officeCards.push(el)
  }

  render() {
    const { offices, button_label, locale } = this.props;

    return (
      <div className={'container offices_'+offices.length }>
        {offices.map((office, index) => {
          let url = {}
          url[locale] = rebuildRouteWithLocale("/offices/"+office.slug, locale)
          return (
            <OfficeCardComponent
              maxHeight={index < 2 ? this.state.firstHeight : this.state.secondHeight}
              ref={(el)=>this.setRef(el)}
              key={"office_"+office._id}
              title={office.city}
              button_label={button_label[locale]}
              url={url[locale]}
              image={office.small_picture}
              address={office.address}
              local_address={office.local_address}
              phone_number={office.phone_number}
              email={office.email}
              locale={locale}
              slug={office.slug}
            />
          )
        })}
      </div>
    );
  }

  preview() {
    // Nothing to preview because there are no attributes
    //  (coming from offices collection)
    return null
  }
}

OfficesCardsComponent.propTypes = {
  button_label: translatedStringProp,
  locale: React.PropTypes.string.isRequired
}

export default OfficesCardsComponentContainer = createContainer(() => {
  return {
    offices: Offices.find().fetch()
  };
}, OfficesCardsComponent);
