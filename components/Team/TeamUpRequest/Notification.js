import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios"; // Ensure axios is installed for API calls
import { MaterialIcons } from "@expo/vector-icons";
import { serverIP } from "@/config";
import { useSelector } from "react-redux";

const Notification = ({ route, navigation }) => {
  //const { individualProfile } = route.params;
  const individualProfile = useSelector((state) => state.individualProfile);
  //const { mobileNumber } = individualProfile;
  const [notifications, setNotifications] = useState(
    individualProfile?.notifications || []
  );
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Handle toggle of notification expansion
  const toggleExpandNotification = (notificationId) => {
    if (expandedNotification === notificationId) {
      setExpandedNotification(null); // Collapse if already expanded
    } else {
      setExpandedNotification(notificationId); // Expand the selected notification
    }
  };

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `https://your-backend-url.com/api/notifications/${userId}`
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    console.log("DEF");
    if (individualProfile?.notifications) {
      console.log("JKL");
      setNotifications(individualProfile?.notifications);
    }
  }, [individualProfile]);

  // Handle accept button click
  const handleAccept = async (notification) => {
    const { teamName, userId } = notification;
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif._id !== notification._id)
    );
    try {
      const response = await axios.post(`${serverIP}/auth/create-a-team`, {
        teamName,
        userId: individualProfile._id, // Use mobileNumber from individualProfile
        teamateId: userId,
        notifId: notification._id, // From the notification object
      });

      console.log(response, "Team created successfully");

      // handleReject(notification._id);

      // Once team is created, remove the notification from the back end
      // await axios.post(`${serverIP}/auth/reject-team-invite`, {
      //   userId: individualProfile._id, // Replace with actual user ID
      //   notificationId,
      // });

      // Alert.alert("Success", response.data.message, [
      //   {
      //     text: "OK",
      //     onPress: () => {
      //       console.log("Fetching teams");
      //       // fetchTeams(); // Call refreshYourTeam or equivalent function
      //     },
      //   },
      // ]);
    } catch (error) {
      console.error("Error creating team:", error);
      // Check if the server provided a custom error message
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to create team";

      Alert.alert("Error", errorMessage);
    }
  };

  // Handle reject button click
  const handleReject = async (notificationId) => {
    console.log(notificationId, "ID");
    try {
      // Replace userId with the actual user ID in context (e.g., individualProfile._id)
      const userId = individualProfile._id;

      const response = await axios.post(`${serverIP}/auth/reject-team-invite`, {
        userId,
        notificationId,
      });

      console.log("Notification rejected:", response.data.message);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
      // Alert.alert("Rejected", "The notification has been successfully removed.");

      // Optional: Trigger any additional actions or state updates, like refreshing the notifications list
    } catch (error) {
      console.error("Error rejecting notification:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to reject notification";
      Alert.alert("Error", errorMessage);
    }
  };

  // Render a single notification item
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <TouchableOpacity
        style={styles.notificationRow}
        onPress={() => toggleExpandNotification(item._id)}
      >
        <Text style={styles.notificationText}>
          {item.teamMateName} wants to team up with you
        </Text>
        <MaterialIcons
          name={
            expandedNotification === item._id
              ? "keyboard-arrow-down"
              : "keyboard-arrow-right"
          }
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {expandedNotification === item._id && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAccept(item)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleReject(item._id)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Notifications</Text> */}
      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No notifications available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 16,
  // },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationRow: {
    flexDirection: "row", // Make the text and icon appear in a row
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Notification;
