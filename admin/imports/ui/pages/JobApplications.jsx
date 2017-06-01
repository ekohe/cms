import React from 'react';

import { Localizations } from '/common/imports/collections';

// UI Components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress';
import PageComponentRowContainer from '../containers/page_components/PageComponentRowContainer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router';
import { connect }  from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router'

// Action
import { updateJobApplicationStatus } from '/imports/client/actions/jobs';
import { deleteJobApplication } from '/imports/client/actions/jobs';

const dateFormat = function(date) {
  var day = date.getDate()
  var monthIndex = date.getMonth()+1
  var year = date.getFullYear()
  return year+"-"+monthIndex+"-"+day
}

class JobApplications extends React.Component {

  handleStatusChange = (application, status) => {
    const { dispatch, job } = this.props;
    dispatch(updateJobApplicationStatus(job._id, application._id, application.createdAt, status))
  }
  deleteApplication(application) {
    const { dispatch, job } = this.props;
    dispatch(deleteJobApplication(job._id, application._id, application.createdAt))
  }
  render() {
    const { job, dispatch, params, localizations, subscriptionReady } = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    const styles = {
      backButtonStyle: {
        float: 'left',
        position: 'relative',
        top: '18px',
        marginLeft: '10px',
        marginRight: '5px'
      },
      select: {
        fontSize: '12px'
      },
      menuItem: {
        fontSize: '14px'
      },
      deleteIcon: {
        marginTop: '-23px'
      }
    }

    return (
    <div>
      <div>
        <IconButton style={styles.backButtonStyle} containerElement={<Link to={"/jobs"}/>}>
          <ArrowBack/>
        </IconButton>
        <h1>Job applications for {"'"+job.position[Localizations.default() ? Localizations.default().locale : '']+"'"}</h1>

          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Subject</TableHeaderColumn>
                <TableHeaderColumn>Message</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Files</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover={true}
              displayRowCheckbox={false}
              >
              {(job.job_applications||[])
                .sort((a,b) => a.createdAt < b.createdAt)
                .map((job_application, index) =>
                <TableRow key={job_application._id}>
                  <TableRowColumn>
                    {job_application.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {job_application.email}
                  </TableRowColumn>
                  <TableRowColumn>
                    {job_application.subject}
                  </TableRowColumn>
                  <TableRowColumn>
                    {job_application.message}
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField style={styles.select} value={job_application.status} onChange={(event, key, payload) => { this.handleStatusChange(job_application, payload) }}>
                      <MenuItem style={styles.menuItem} value={'new'} primaryText="New" />
                      <MenuItem style={styles.menuItem} value={'rejected'} primaryText="Rejected" />
                      <MenuItem style={styles.menuItem} value={'spam'} primaryText="Spam" />
                      <MenuItem style={styles.menuItem} value={'pending'} primaryText="Pending" />
                      <MenuItem style={styles.menuItem} value={'replied'} primaryText="Replied" />
                      <MenuItem style={styles.menuItem} value={'offered'} primaryText="Offered" />
                      <MenuItem style={styles.menuItem} value={'closed'} primaryText="Closed" />
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn>
                    <ul>{job_application.attachments && job_application.attachments.map((attachment, index) =>
                      <li key={"attachment_"+index}>
                        <a href={"https://"+Meteor.settings.public['user-uploads-bucket']+".s3-"+Meteor.settings.public['user-uploads-region']+".amazonaws.com"+attachment.path} target="_blank">{attachment.filename}</a>
                      </li>
                    )}
                    </ul>
                  </TableRowColumn>
                  <TableRowColumn>{dateFormat(job_application.createdAt)}</TableRowColumn>
                  <TableRowColumn>
                    <MenuItem style={styles.deleteIcon} primaryText="" leftIcon={<DeleteIcon />} onTouchTap={()=>{this.deleteApplication(job_application)}}/>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </div>
    </div>
    )
  };
}

const JobApplicationsContainer = createContainer(({id}) => {
  const jobsSubscription = Meteor.subscribe('jobs');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: jobsSubscription.ready() && localizations.ready(),
    job: Jobs.findOne({_id: id}) || {},
    localizations: Localizations.find({}).fetch() || []
  };
}, JobApplications);

function mapStateToProps(state, ownProps) {
  return {id: ownProps.params.id, routes: ownProps.routes};
}

export default connect(mapStateToProps)(JobApplicationsContainer);
