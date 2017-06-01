import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import humanizeString from '/common/imports/helpers/humanizeString';

import { Images } from '/common/imports/collections';

export default class ImageSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: props.value}
  }

  handleChange(value) {
    this.props.onChange(this.props.name, value);
    this.setState({value});
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const { name, value, localizations } = this.props;

    const imageId = this.state.value
    const image = Images.findOne(imageId)
    const imageName = image==null ? imageId : image.name
    const dataSource = Images.find({}).fetch().map((image) => ({text: image.name, value: image.name, id: image._id}));

    const styles= {
      container: {
        marginBottom: '30px'
      },
      imagePreview: {
        background: "#eeeeee"
      }
    }

    return (
      <div style={styles.container}>
        <h4>
          {humanizeString(name)}
        </h4>
        <div>
          <div>
            <AutoComplete
              floatingLabelText={humanizeString(name)}
              filter={AutoComplete.fuzzyFilter}
              openOnFocus={true}
              fullWidth={true}
              dataSource={dataSource}
              searchText={imageName}
              onNewRequest={(chosenRequest, index) => ( this.handleChange(chosenRequest.id) )}
              onUpdateInput={(searchText, dataSource) => ( this.handleChange(searchText) )}
            />
          </div>
          <div>
            {image && <img alt={image.name} src={Meteor.settings.public.cdn + image.path} style={styles.imagePreview} className="image_details_preview"/>}
          </div>
        </div>
      </div>
    )
  }
}
