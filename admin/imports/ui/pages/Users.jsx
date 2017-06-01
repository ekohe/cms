import React from 'react'

import UsersListContainer from '../containers/users/UsersListContainer.js'
import { connect }  from 'react-redux'

class Users extends React.Component {
  render() {
    return (
    <div>
      <h1>Users</h1>
      <UsersListContainer/>
    </div>
    )
  };
}

export default connect()(Users)
