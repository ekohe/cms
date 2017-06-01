import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

// Collections
import { Localizations } from '/common/imports/collections';

import UAParser from 'ua-parser-js'

export default class InquiryDetailsDialog extends React.Component {
  render() {
    const { inquiry } = this.props;

    const actions = [
      <FlatButton
        label="Ok"
        containerElement={<Link to="/inquiries"/>}
      />
    ]
    let browser = 'Unknown'
    let os = 'Unknown'
    let device = 'Desktop'
    if (inquiry.user_agent!=null) {
      const parser = new UAParser(inquiry.user_agent)
      if (parser!=null) {
        const parsingResults = parser.getResult()
        if (parsingResults!=null) {
          browser = parsingResults.browser.name + " " + parsingResults.browser.major
          os = parsingResults.os.name + " " + parsingResults.os.version
          if (parsingResults.device.model!=null) {
            device = parsingResults.device.model
          }
        }
      }
    }

    return (
      <div>
        <Dialog
            title="Inquiry details"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          {inquiry==null ? "Inquiry not found" :
            <dl>
              <dt>Name:</dt>
              <dd>{inquiry.name}</dd>
              <dt>Email:</dt>
              <dd>{inquiry.email}</dd>
              <dt>Subject:</dt>
              <dd>{inquiry.subject}</dd>
              <dt>Message:</dt>
              <dd>{inquiry.message}</dd>
              <dt>Attachments:</dt>
              { ((inquiry.attachments == null) || (inquiry.attachments.length==0)) ?
                <dd>None</dd> :
                <dd>
                  <ul>
                    {inquiry.attachments.map((attachment, index) =>
                      <li key={"attachment_"+index}>
                        <a href={"https://"+Meteor.settings.public['user-uploads-bucket']+".s3-"+Meteor.settings.public['user-uploads-region']+".amazonaws.com"+attachment.path} target="_blank">{attachment.filename}</a>
                      </li>
                    )}
                  </ul>
                </dd>
              }
              <dt>URL:</dt>
              <dd><a href={inquiry.url} target="_blank">{inquiry.url}</a></dd>
              <dt>Language:</dt>
              <dd>{Localizations.find({locale: inquiry.locale}).fetch()[0] ? Localizations.find({locale: inquiry.locale}).fetch()[0].name : inquiry.locale}</dd>
              <dt>IP Address:</dt>
              <dd><a href={"http://ipinfo.io/"+inquiry.ip_address} target="_blank">{inquiry.ip_address}</a></dd>
              <dt>Timezone offset:</dt>
              <dd>{inquiry.timezone_offset}</dd>
              <dt>Browser:</dt>
              <dd>{browser}</dd>
              <dt>Device:</dt>
              <dd>{device}</dd>
              <dt>OS:</dt>
              <dd>{os}</dd>
              <dt>User agent:</dt>
              <dd>{inquiry.user_agent}</dd>
            </dl>
          }
        </Dialog>
      </div>
    )
  }
};
