import React from 'react';

let nextMessageId = 0;

export default function snackMessages(state = {visible: false, currentMessage: null, messages: []}, action = {}) {
  switch (action.type) {
    case 'DISPLAY_SNACKBAR_MESSAGE':
      if (!state.visible) {
        // Display the new message now
        return {
          visible: true,
          currentMessage: <span key={nextMessageId++} style={{fontFamily: "kozuka-gothic-pro, helvetica, sans-serif"}}>{action.message}</span>,
          messages: [...state.messages]
        }
      } else {
        // Queue the message for later
        return {
          ...state,
          messages: [
            ...state.messages,
            action.message
          ]
        };
      }
    case 'HIDE_SNACKBAR_MESSAGE':
      if (state.messages.length>0) {
        // Go on the next message
        const message = state.messages[0]
        return {
          visible: true,
          currentMessage: <span key={nextMessageId++} style={{fontFamily: "kozuka-gothic-pro, helvetica, sans-serif"}}>{message}</span>,
          messages: state.messages.slice(1)
        }
      } else {
        // Simply hide for now
        return {
          visible: false,
          currentMessage: null,
          messages: []
        }
      }
    default:
      return state;
  }
}
