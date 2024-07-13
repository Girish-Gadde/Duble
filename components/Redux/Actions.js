// actions.js

export const TOGGLE_EDIT_BUTTON_AND_BIO = "TOGGLE_EDIT_BUTTON_AND_BIO";
export const TOGGLE_SHOW_ICONS = "TOGGLE_SHOW_ICONS";

export const toggleEditButtonAndBio = () => ({
  type: TOGGLE_EDIT_BUTTON_AND_BIO,
});

export const toggleShowIcons = () => ({
  type: TOGGLE_SHOW_ICONS,
});
