import React from 'react'

import InquiriesListContainer from '../containers/inquiries/InquiriesListContainer.js'
import InquiryDetailsDialogContainer from '../containers/inquiries/InquiryDetailsDialogContainer.js'
import { connect }  from 'react-redux'

class Inquiries extends React.Component {
  render() {
    // On /inquiries/:id, the details modal dialog must be opened
    const detailsDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id' : false);

    return (
    <div>
      <h1>Inquiries</h1>
      <InquiriesListContainer/>
      {detailsDialogOpened && <InquiryDetailsDialogContainer inquiryId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Inquiries)
