// reducer.js

import { TOGGLE_EDIT_BUTTON_AND_BIO, TOGGLE_SHOW_ICONS } from "./Actions";

const initialState = {
  showEditButtonAndBio: false,
  showIcons: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_BUTTON_AND_BIO:
      return {
        ...state,
        showEditButtonAndBio: !state.showEditButtonAndBio,
      };
    case TOGGLE_SHOW_ICONS:
      return {
        ...state,
        showIcons: !state.showIcons,
      };
    default:
      return state;
  }
};

export default reducer;
