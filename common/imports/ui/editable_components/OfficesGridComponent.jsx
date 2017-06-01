import React from 'react';

// Collections
import { Images } from '/common/imports/collections';
import Offices from '/common/imports/collections/offices';

// Helpers
import arrayOfTranslatedStringsProp from '/common/imports/properties/arrayOfTranslatedStringsProp'
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing';

// Components
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export default class OfficesGridComponent extends React.Component {
  render() {
    const { collection, element, cities, locale } = this.props;

    let offices = Offices.find().fetch()

    // On an office page, exclude the current office
    if ((element!=null) && (collection._name=="offices")) {
      offices = Offices.find({_id: {$ne: element._id}}).fetch()
    }

    // On career detail page, show avaliable office
    if ((element!=null) && (collection._name=="jobs")) {
      // offices = Offices.find({_id: {$ne: element._id}}).fetch()
      offices = Offices.find({slug: {$in: cities}}).fetch()
    }

    return (
      <div className={'offices_grid_component offices_'+offices.length }>
        {offices.map((office) =>
          <div key={"office_"+office._id} className="office">
            <Link to={rebuildRouteWithLocale("/offices/"+office.slug, locale)}>
              <div className='bg' style={office.small_picture==null ? null : {background: "url("+imageUrl(office.small_picture)+")"}}>
              </div>
              <FlatButton
              className='white_button'
              key={"link_"+office}
              label={office.city[locale]}
              />
            </Link>
          </div>
        )}
      </div>
    );
  }

  preview() {
    // Nothing to preview because there are no attributes
    //  (coming from offices collection)
    return null
  }
}

OfficesGridComponent.propTypes = {
  cities: arrayOfTranslatedStringsProp,
  locale: React.PropTypes.string.isRequired
}
