import React from 'react';

// Collections
import { Images } from '/common/imports/collections';
import Offices from '/common/imports/collections/offices';
import TeamMembers from '/common/imports/collections/team_members';

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl';
import { rebuildRouteWithLocale } from '/common/imports/routing';
import translationExists from '/common/imports/helpers/translationExists'
import nl2br from '/common/imports/helpers/nl2br'

// Components
import { Link } from 'react-router';
import TeamMemberComponent from './TeamMemberComponent';
import TimeClockComponent from './TimeClockComponent';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import CallIcon from 'material-ui/svg-icons/communication/call';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import translatedStringProp from '/common/imports/properties/translatedStringProp';

export default class OfficeContactComponent extends React.Component {
  state = {
    timeString: '',
    dateString: ''
  }

  calculateTime = () => {
    const { element } = this.props;

    const date = new Date()
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000*parseFloat(element.timezone||0)));
  }

  renderTime = () => {
    if (Meteor.isServer) { return ''}

    const datetime = this.calculateTime()
    let diem = 'am';
    let minutes = datetime.getMinutes()
    if (minutes < 10) { minutes = "0"+minutes}
    let hours = datetime.getHours()
    if (hours >= 12) {
      diem = 'pm';
    }
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours -12;
    }
    const currentTimeString = hours + ":" + minutes + diem

    // Day on different city
    const { locale } = this.props;
    const days = {}
    days['en'] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    days['fr'] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    days['cn'] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    days['jp'] = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
    this.setState({timeString: currentTimeString})
    this.setState({dateString: days[locale] ? days[locale][datetime.getDay()] : days['en'][datetime.getDay()]})
  }

  componentDidMount() {
    if (Meteor.isClient) {
      this.renderTimeInterval = Meteor.setInterval(this.renderTime, 1000)
    }
  }

  componentWillUnmount() {
    if (Meteor.isClient) {
      Meteor.clearInterval(this.renderTimeInterval)
    }
  }

  render() {
    const { collection, element, title, currentTime, locale } = this.props;
    const cityName = element.city[locale]
    // Current time on different city
    let timeStr = (translationExists(currentTime, locale) ? currentTime[locale] : '')
    timeStr = timeStr.replace("[city]", cityName)
    timeStr = timeStr.replace("[time]", this.state.timeString)
    timeStr = timeStr.replace("[day]", this.state.dateString)
    return (
      <div className='container office_contact_component'>
        <div className='office_detail'>
          <TimeClockComponent office={element}/>
          <h2>{timeStr}</h2>
          {
            (element.address!=null && element.address!='')
            ? <h4>
                <PlaceIcon/>
                {nl2br(element.address)}
              </h4>
            : null
          }
          {
            (element.local_address!=null && element.local_address!='')
            ? <h4>
                <PlaceIcon/>
                {nl2br(element.local_address)}
              </h4>
            : null
          }
          {
            (element.phone_number!=null && element.phone_number!='')
            ? <h4>
                <CallIcon/>
                {element.phone_number}
              </h4>
            : null
          }
          {
            (element.email!=null && element.email!='')
            ? <h4>
                <EmailIcon/>
                {element.email}
              </h4>
            : null
          }
        </div>
        <div className='team_contact'>
          {
            translationExists(title, locale)
            ? <div className='title'>{nl2br(title[locale])}</div>
            : null
          }
          {element.contact_id && <TeamMemberComponent team_member_id={element.contact_id} locale='en' />}
        </div>

      </div>
    );
  }

  preview() {
    // Nothing to preview because there are no attributes
    //  (coming from offices collection)
    return null
  }
}

OfficeContactComponent.propTypes = {
  currentTime: translatedStringProp,
  title: translatedStringProp,
  locale: React.PropTypes.string.isRequired
}
