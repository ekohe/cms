import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

import ImageDetails from './ImageDetails';

export default class ImageDetailsDialog extends React.Component {
  render() {
    const { image } = this.props;

    const actions = [
      <FlatButton
        label="Ok"
        containerElement={<Link to="/images"/>}
      />
    ]

    let previousImageIndex = 0
    return (
      <div>
        <Dialog
            title={image.name + " Image details"}
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <ImageDetails image={image}/>

          {image.previousImages && image.previousImages.length > 0 ? <h2>Previous versions:</h2> : null}
          {image.previousImages && image.previousImages.map(previousImage =>
            (
              <ImageDetails key={"previousImage_"+(previousImageIndex++)} image={previousImage}/>
            )
          )}
        </Dialog>
      </div>
    )
  }
};
