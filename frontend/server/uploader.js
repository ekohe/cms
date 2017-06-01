import '/imports/startup/upload.js'

if (Meteor.settings.AWSBucket==null) {
  console.log("WARNING: Did you forget to set the settings with the --settings command line option ?")
}

Slingshot.createDirective("user-uploads", Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSBucket,
  acl: "public-read",
  authorize: function () {
    return true;
  },

  key: function (file) {
    var uuid = Meteor.uuid().substring(0,4);
    return uuid + "/" + file.name;
  }
});
