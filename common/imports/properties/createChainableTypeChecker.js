var ANONYMOUS = '<<anonymous>>';
import ReactPropTypeLocationNames from 'react';

export default function createChainableTypeChecker(validate) {
  function checkType(
    isRequired,
    props,
    propName,
    componentName,
    location,
    propFullName
  ) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propFullName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
