// UserContext.js
import React, { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  const indexRef = useRef(selectedTeamIndex);

  useEffect(() => {
    const loadSelectedIndex = async () => {
      try {
        const savedIndex = await AsyncStorage.getItem("selectedTeamIndex");
        if (savedIndex !== null) {
          const parsedIndex = parseInt(savedIndex, 10);
          setSelectedTeamIndex(parsedIndex); // This will trigger a re-render
          indexRef.current = parsedIndex; // Update ref
          //console.log("Loaded Selected Team Index from AsyncStorage:", savedIndex);
        }
      } catch (error) {
        console.error("Failed to load selected team index:", error);
      }
    };

    loadSelectedIndex(); // Initial fetch

    const intervalId = setInterval(loadSelectedIndex, 2000); // Fetch every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const saveSelectedIndex = async () => {
      try {
        if (selectedTeamIndex !== null) {
          await AsyncStorage.setItem(
            "selectedTeamIndex",
            selectedTeamIndex.toString()
          );
          console.log(
            "Saved Selected Team Index to AsyncStorage:",
            selectedTeamIndex
          );
        }
      } catch (error) {
        console.error("Failed to save selected team index:", error);
      }
    };

    saveSelectedIndex();
  }, [selectedTeamIndex]);

  return (
    <UserContext.Provider
      value={{ selectedTeamIndex, setSelectedTeamIndex, indexRef }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
