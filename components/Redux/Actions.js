// actions.js

export const TOGGLE_EDIT_BUTTON_AND_BIO = "TOGGLE_EDIT_BUTTON_AND_BIO";
export const TOGGLE_SHOW_ICONS = "TOGGLE_SHOW_ICONS";
export const MENU_CLICK = "MENU_CLICK";
export const SET_INDIVIDUAL_PROFILE = "SET_INDIVIDUAL_PROFILE";
export const SET_PROFILE = "SET_PROFILE";
export const CLEAR_PROFILES = "CLEAR_PROFILES";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const toggleEditButtonAndBio = () => ({
  type: TOGGLE_EDIT_BUTTON_AND_BIO,
});

export const toggleShowIcons = () => ({
  type: TOGGLE_SHOW_ICONS,
});

export const menuClickAction = () => ({
  type: MENU_CLICK,
});

export const setIndividualProfile = (profile) => ({
  type: SET_INDIVIDUAL_PROFILE,
  payload: profile,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

// export const clearProfiles = () => ({
//   type: CLEAR_PROFILES,
// });

// export const updateProfile = (userId) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         `${serverIP}/auth/get-your-team?userId=${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch updated profile");
//       }

//       const data = await response.json();
//       dispatch(setProfile(data)); // Dispatch the existing setProfile action with the updated profile data
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };
// };
