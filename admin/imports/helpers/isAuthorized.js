export default isAuthorized = function() {
  return (Meteor.userId() !== null) && (Meteor.user() && Meteor.user().authorized)
}
