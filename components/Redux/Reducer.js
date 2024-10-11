// reducer.js

import {
  CLEAR_PROFILES,
  MENU_CLICK,
  SET_INDIVIDUAL_PROFILE,
  SET_PROFILE,
  SET_TEAMS,
  TOGGLE_EDIT_BUTTON_AND_BIO,
  TOGGLE_SHOW_ICONS,
} from "./Actions";

const initialState = {
  showEditButtonAndBio: false,
  showIcons: true,
  menuClicked: true,
  individualProfile: null,
  profile: null,
  teams: null,
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
    case MENU_CLICK:
      return {
        ...state,
        menuClicked: !state.menuClicked, // Toggle the menuClicked state
      };
    case SET_INDIVIDUAL_PROFILE:
      return {
        ...state,
        individualProfile: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        individualProfile: null,
        profile: null,
      };
    default:
      return state;
  }
};

export default reducer;
