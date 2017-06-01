export default function navigationVisibility(state = {visible: true}, action = {}) {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION_VISIBILITY':
      return {visible: !state.visible}
    default:
      return state;
  }
}
