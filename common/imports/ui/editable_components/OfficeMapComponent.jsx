import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Properties
import stringProp from '/common/imports/properties/stringProp';
import translatedStringProp from '/common/imports/properties/translatedStringProp';

// Helpers
import translationExists from '/common/imports/helpers/translationExists';

// Components
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Images } from '/common/imports/collections'

class OfficeMapComponent extends React.Component {
  mapInitialized = false
  mapNeedsUpdate = false
  mapProvider = 'google' // or 'mapbox'
  mapMarker = null
  mapMarkerElement = null
  mapMarkerListener = null
  mapName = null
  googleMap = null
  mapboxMap = null
  markerUrl = Meteor.settings.public.cdn + '/59fa/marker.png'
  defaultMapZoom = 12

  componentWillMount() {
    if (Meteor.isClient) {
      $.ajax({type: 'HEAD',
              url: '/',
              async: true,
              success: (data, req, xhr) => {
                var countryCode = xhr.getResponseHeader('x-geoip-country-code');
                if ((countryCode!=null) && (countryCode.toLowerCase()=='cn')) {
                  this.mapProvider = 'mapbox'
                } else {
                  this.mapProvider = 'google'
                }
                this.setupMapProvider()
              }
             });
    } else {
      this.setupMapProvider()
    }
  }

  setupMapProvider() {
    if (this.mapProvider=='mapbox') {
      if (Meteor.isClient) {
        if (!Mapbox.loaded()) {
          Mapbox.load({
            gl: true,
            plugins: []
          })
        }
      }
    }

    if (this.mapProvider=='google') {
      if (Meteor.isClient) {
        if (!GoogleMaps.loaded()) {
          GoogleMaps.load({key: Meteor.settings.public.google_maps_api_key});
        }
      }
    }
  }

  updateMap() {
    const { latitude, longitude, mapZoom, url, google_maps_loaded } = this.props;

    let mapZoomLevel = this.defaultMapZoom
    if ((mapZoom!=undefined) && (parseInt(mapZoom)!=0)) {
      mapZoomLevel = parseInt(mapZoom)
    }

    if (this.mapProvider=='mapbox') {
      this.mapboxMap.setCenter([parseFloat(longitude), parseFloat(latitude)])
      this.mapboxMap.setZoom(mapZoomLevel)
      this.mapMarker.setLngLat([parseFloat(longitude), parseFloat(latitude)])
      this.mapMarkerElement.removeEventListener('click', this.mapMarkerListener)
      this.mapMarkerElement.addEventListener('click', function() {
        window.open(url, '_blank');
      });
    }


    if (this.mapProvider=='google') {
      const newCenter = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude))
      this.googleMap.setCenter(newCenter)
      this.googleMap.setZoom(mapZoomLevel)
      this.mapMarker.setPosition(newCenter)
      google.maps.event.clearInstanceListeners(this.mapMarker)
      this.mapMarker.addListener('click', function() {
        window.open(url, '_blank')
      })
    }
  }


  renderMap() {
    if (this.mapNeedsUpdate) {
      this.updateMap()
    }
    if (this.mapInitialized) {
      return;
    }
    const { latitude, longitude, mapZoom, url, google_maps_loaded, mapbox_loaded } = this.props;

    let mapZoomLevel = this.defaultMapZoom
    if ((mapZoom!=undefined) && (parseInt(mapZoom)!=0)) {
      mapZoomLevel = parseInt(mapZoom)
    }

    if (this.mapProvider=='mapbox') {

      // Mapbox
      if (!mapbox_loaded) { return }

      mapboxgl.accessToken = Meteor.settings.public.mapbox_access_token

      this.mapboxMap = new mapboxgl.Map({
          container: this.refs.map,
          style: 'mapbox://styles/maximeguilbot/cisoidbdn002t2xp8naioqd6v',
          center: [parseFloat(longitude), parseFloat(latitude)],
          zoom: mapZoomLevel
      })

      this.mapboxMap.scrollZoom.disable();

      this.mapMarkerElement = document.createElement('div')
      this.mapMarkerElement.className = 'marker'
      this.mapMarkerElement.style.backgroundImage = "url('"+this.markerUrl+"')"
      this.mapMarkerElement.style.backgroundSize = '100%'
      this.mapMarkerElement.style.width = "92px"
      this.mapMarkerElement.style.height = "57px"
      this.mapMarkerElement.style.cursor = 'pointer'
      this.mapMarker = new mapboxgl.Marker(this.mapMarkerElement, {offset: [-46, -55]})
                            .setLngLat([parseFloat(longitude), parseFloat(latitude)])
                            .addTo(this.mapboxMap)
      this.mapMarkerListener = function() {
        window.open(url, '_blank');
      }
      this.mapMarkerElement.addEventListener('click', this.mapMarkerListener);

      this.mapInitialized = true

      return;
    } else {

      // Google Maps

      if (!google_maps_loaded) { return }

      const mapOptions = {
        center: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
        scrollwheel: false,
        zoom: mapZoomLevel
      }

      this.mapName = "map_"+Meteor.uuid()

      if (Meteor.isClient) {
        GoogleMaps.create({
          name: this.mapName,
          element: this.refs.map,
          options: mapOptions,
        })

        GoogleMaps.ready(this.mapName, (map) => {
          // Store the map instance object
          this.googleMap = map.instance

          // Add a marker to the map once it's ready
          const image = {
            url: this.markerUrl,
            scaledSize: new google.maps.Size(92, 57)
          }
          this.mapMarker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            icon: image
          })

          this.mapMarker.addListener('click', function() {
            window.open(url, '_blank')
          })
        })
      }
    }

    this.mapInitialized = true
  }

  componentDidMount() {
    this.renderMap()
  }

  componentDidUpdate() {
    this.renderMap()
  }

  componentWillReceiveProps(nextProps) {
    const { latitude, longitude, url, google_maps_loaded } = this.props;

    if (this.mapInitialized) {
      if ((latitude!=nextProps.latitude) ||
          (longitude!=nextProps.longitude)) {
        this.mapNeedsUpdate = true
      }
    }
  }

  render() {
    const { button_label, url, google_maps_loaded, locale } = this.props;
    return (
      <div className='office_map_component container'>
        <div ref='map' className="map"></div>
        <FlatButton
          className='google_map'
          label={(button_label==null) ? 'GOOGLE MAP' : button_label[locale]}
          containerElement={<Link to={(url==null) ? '/' : url} target='_blank'/>}/>
        <div className='transparent'>
          <div className='css3-shadow'></div>
        </div>
      </div>

    );
  }

  preview() {
    const { latitude, longitude, button_label, url, locale } = this.props;

    let texts = []

    texts.push("Latitude: "+latitude)

    texts.push("Longitude: "+longitude)

    translationExists(button_label, locale)
    ? texts.push("Button Label: "+button_label[locale].substring(0, 50))
    : null

    texts.push("Button Link: "+url)

    return (
      <div>{texts.join(", ")}</div>
    )
  }
}

OfficeMapComponent.propTypes = {
  latitude: stringProp,
  longitude: stringProp,
  mapZoom: stringProp,
  button_label: translatedStringProp,
  url: stringProp,
  locale: React.PropTypes.string.isRequired
}


const OfficeMapComponentContainer = createContainer(() => {
  return {
    google_maps_loaded: (Meteor.isClient && GoogleMaps.loaded()),
    mapbox_loaded: (Meteor.isClient && Mapbox.loaded())
  };
}, OfficeMapComponent);

export default OfficeMapComponentContainer;
