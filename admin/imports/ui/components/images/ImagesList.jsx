import React, { PropTypes } from 'react'

// UI components
import LinearProgress from 'material-ui/LinearProgress';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import PhotoIcon from 'material-ui/svg-icons/image/photo'

import { Link } from 'react-router';

// Action
import { deleteImage } from '../../../client/actions/images';

export default class ImagesList extends React.Component {
  render() {
    const { dispatch, collection, subscriptionReady } = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: "100%",
        overflowY: 'auto',
        marginBottom: 24,
      },
      gridTitle: {
        background: "#f0f0f0"
      }
    };

    return (
      <div style={styles.root}>
        <GridList
        cellHeight={200}
        style={styles.gridList}
        cols={4}
      >
        {collection.map(row =>
          <GridTile
            key={row._id}
            title={row.name}
            actionIcon={<IconMenu
              iconButtonElement={<IconButton><MoreVertIcon color="white" /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              useLayerForClickAway={true}
            >
              <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/images/"+row._id+"/edit"}/>}/>
              <MenuItem primaryText="Details" leftIcon={<PhotoIcon />} containerElement={<Link to={"/images/"+row._id+"/details"}/>}/>
              <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteImage(row._id))}}/>
            </IconMenu>}
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 70%,rgba(0,0,0,0) 100%)"
            style={styles.gridTitle}
          >
            <img src={Meteor.settings.public.cdn + row.path} />
          </GridTile>
        )}
        </GridList>
      </div>
    )
  }
}
