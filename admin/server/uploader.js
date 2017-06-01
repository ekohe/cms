import '/imports/startup/upload.js'

if (Meteor.settings.AWSBucket==null) {
  console.log("WARNING: Did you forget to set the settings with the --settings command line option ?")
}

Slingshot.createDirective("images", Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSBucket,
  acl: "public-read",
  cdn: Meteor.settings.public.cdn,
  cacheControl: "max-age=2592000",
  authorize: function () {
    var message = "Please login before posting files";

    if (!this.userId) {
      throw new Meteor.Error("Login Required", message);
    } else {
      var user = Meteor.users.findOne(this.userId);
      if (!user.authorized) {
        throw new Meteor.Error("Login Required", message);
      }
    }

    return true;
  },

  key: function (file) {
    var uuid = Meteor.uuid().substring(0,4);
    return uuid + "/" + file.name;
  }
});
