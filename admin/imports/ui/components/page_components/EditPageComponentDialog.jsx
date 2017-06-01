import React from 'react';
import { renderToString } from 'react-dom/server';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Custom components
import * as components from '/common/imports/ui/editable_components'
import humanizeString from '/common/imports/helpers/humanizeString'

// Controls
import TranslatableTextField from '../TranslatableTextField'
import TranslatableTextFieldsList from '../TranslatableTextFieldsList'
import TextControlList from '../TextControlList'
import ImageSelector from '../ImageSelector'
import ImageSelectorList from '../ImageSelectorList'
import TextControl from '../TextControl'
import BooleanControl from '../BooleanControl'

import { Link } from 'react-router';

import { Localizations } from '/common/imports/collections';
import Store from '/imports/store/store';

// Actions
import { updatePageComponentProps } from '../../../client/actions/page_components'

export default class EditPageComponentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.componentProps = props.component.props
  }

  // Events triggered when value changes
  onChange = (key, value) => {
    this.componentProps[key] = value
  }

  // Update action
  update = () => {
    const { dispatch } = this.props;
    dispatch(updatePageComponentProps(this.props.pageId, this.props.component._id, this.componentProps));
  }

  render() {
    const { pageType, component, localizations } = this.props;

    let componentClass = eval("components."+component.type);

    let componentElement = null
    let componentProps = _.clone(component.props)

    const defaultLocale = Localizations.find({default: true}).fetch()[0]
    componentProps.locale = (defaultLocale!=null) ? defaultLocale.locale : ''
    componentProps.store = Store
    if (defaultLocale==null) {
      console.log("Please configure a default localization")
    }

    if (componentClass!=undefined) {
      componentElement = new componentClass(componentProps)
    }

    // Detect if it's a container, in that case, grab the component inside the container
    if (typeof(componentElement.getMeteorData)=="function") {
      componentClass = componentElement.render().type
    }

    let fields = []
    Object.keys(componentClass.propTypes).map(propKey => {
      // Skip the locale property, which is only defined to render the component
      //  The locale value is the locale selected by the site visitor
      if (propKey=='locale') {
        return;
      }

      // Map proptypes to editor components
      let propControl = null
      switch (componentClass.propTypes[propKey]) {
        case translatedStringProp:
          propControl = TranslatableTextField
          break;
        case imageProp:
          propControl = ImageSelector
          break;
        case stringProp:
          propControl = TextControl
          break;
        case booleanProp:
          propControl = BooleanControl
          break;
        case arrayOfStringsProp:
          propControl = TextControlList
          break;
        case arrayOfTranslatedStringsProp:
          propControl = TranslatableTextFieldsList
          break;
        case arrayOfImagesProp:
          propControl = ImageSelectorList
          break;
        default:
          console.log("Could not find editor for " + propKey);
      }

      // Create the editing component
      if (propControl!=null) {
        const controlProps = {
          key: propKey,
          name: propKey,
          onChange: this.onChange,
          value: component.props[propKey],
          pageType: pageType,
          localizations
        }
        fields.push(React.createElement(propControl, controlProps))
      }

    });

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to={"/pages/"+this.props.pageId+"/design"}/>}
      />,
      <FlatButton
        label="Update"
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.update}
      />
    ];

    return (
      <Dialog
          title="Edit page component"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
          className="edit_page_component"
        >
        {fields}
      </Dialog>
    )
  }
}
