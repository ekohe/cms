import {ServiceConfiguration} from 'meteor/service-configuration'

export default loadGoogleAuthConfiguration = () => {
  if (ServiceConfiguration.configurations.find().count() == 0) {
    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: "xxx",
      loginStyle: "popup",
      secret: "xxx"
    })
  }
}
