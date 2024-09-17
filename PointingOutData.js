import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "./components/Team Switch/UserContext";

const serverIP = "http://192.168.1.19:4002";
const userId = '66d6e8e49b889ada7a2c9fcf';

const TeamListScreen = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    console.log("Global Selected Team Index:", selectedTeamIndex);
  }, [selectedTeamIndex]);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `${serverIP}/auth/get-your-team?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch your team");
      }

      const responseData = await response.json();
      setTeams(responseData);
      setError("");  // Clear error on success
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError("Failed to fetch your team. Please try again later.");
    }
  };

  const handleTeamClick = (team, index) => {
    setSelectedTeamIndex(index); // Update the selected team index globally
    console.log(`Selected Team Index: ${index}`);  // Log the selected index
    console.log(team, "Selected Team");
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
  );

  return (
    <View style={styles.containerTeam}>
      <Text style={styles.headingTeam}>Your Teams</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : teams.length > 0 ? (
        teams.map((team, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.teamItemWrapper}
            onPress={() => handleTeamClick(team, index)}
          >
            <View style={styles.teamItemTeam}>
              <RadioButton selected={selectedTeamIndex === index} />
              <Text style={styles.teamTextTeam}>
                {team.name1} and {team.name2}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noTeamsTextTeam}>No teams available.</Text>
      )}
    </View>
  );
};

export default TeamListScreen;

const styles = StyleSheet.create({
  containerTeam: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headingTeam: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  teamItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  teamItemTeam: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    flex: 1,
  },
  teamTextTeam: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  noTeamsTextTeam: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#444",
  },
});


