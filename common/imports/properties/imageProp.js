import createChainableTypeChecker from './createChainableTypeChecker'

export default imageProp = function() {
  function validate(props, propName, componentName, location, propFullName) {
    // TODO: validate that props[propName] is a simple string-string object
    return null;
  }

  return createChainableTypeChecker(validate)
}()
