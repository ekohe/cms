import React from 'react';

//  UI Components
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

// Icons
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

import * as components from '/common/imports/ui/editable_components'

import { Link } from 'react-router';

// Helper functions
import humanizeString from '/common/imports/helpers/humanizeString'
import Store from '/imports/store/store';

// Actions
import {moveUpwardPageComponent, moveDownwardPageComponent} from '../../../client/actions/page_components'

import { Localizations } from '/common/imports/collections';

export default class PageComponentRow extends React.Component {
  upward = () => {
    const { dispatch, pageId, component } = this.props;
    dispatch(moveUpwardPageComponent(pageId, component._id));
  }

  downward = () => {
    const { dispatch, pageId, component } = this.props;
    dispatch(moveDownwardPageComponent(pageId, component._id));
  }

  render() {
    const { component, localizations, index, count } = this.props;

    const styles = {
      paper: {
        margin: 20,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10
      },
      moreButton: {
        float: 'right',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '20px'
      },
      arrowButton: {
        float: 'right',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '14px'
      }
    }

    const canGoUp = (index > 0);
    const canGoDown = ((index+1) < count);

    let componentProps = _.clone(component.props)

    const defaultLocale = Localizations.find({default: true}).fetch()[0]
    componentProps.locale = (defaultLocale!=null) ? defaultLocale.locale : ''
    componentProps.store = Store
    if (defaultLocale==null) {
      console.log("Please configure a default localization")
    }

    let componentClass = eval("components."+component.type)
    let componentElement = null
    if (componentClass!=undefined) {
      componentElement = new componentClass(componentProps)
    }

    // Detect if it's a container, in that case, grab the component inside the container
    if (typeof(componentElement.getMeteorData)=="function") {
      componentClass = componentElement.render().type
    }

    const canEdit = Object.keys(componentClass.propTypes||{}).length > 1

    return (<Paper
      style={styles.paper}
      zDepth={1}>
      <FlatButton
        label="Remove"
        style={styles.moreButton}
        containerElement={<Link to={"/pages/"+this.props.pageId+"/design/"+component._id+"/confirm_deletion"}/>}
      />
      {canEdit && componentElement && <FlatButton
        label="Edit"
        primary={true}
        style={styles.moreButton}
        containerElement={<Link to={"/pages/"+this.props.pageId+"/design/"+component._id+"/edit"}/>}
      />}
      {canGoUp &&
        <IconButton style={styles.arrowButton} onTouchTap={this.upward}>
          <ArrowUpward/>
        </IconButton>}
      {canGoDown &&
        <IconButton style={styles.arrowButton} onTouchTap={this.downward}>
          <ArrowDownward/>
        </IconButton>
      }
      <h2>{humanizeString(component.type)}</h2>
      {componentElement==null ? <div className="preview error">Component not found</div> : <div className="preview">{(typeof(componentElement.preview)=='function' ? componentElement.preview() : '')}</div>}
    </Paper>)
  }
}
