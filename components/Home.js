import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import ImageScreen1 from "./ImageScreens/ImageScreen1";
import ImageScreen2 from "./ImageScreens/ImageScreen2";
import ImageScreen3 from "./ImageScreens/ImageScreen3";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ImageScreen4 from "./ImageScreens/ImageScreen4";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        return (
          <View
            key={index}
            style={[styles.tabBarItem, isFocused && styles.tabBarItemSelected]}
          >
            <Text onPress={() => navigation.navigate(route.name)}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Home = () => {
  return (
    <NavigationContainer independent="true">
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          activeTintColor: "green",
          labelStyle: { fontSize: 10 },
          style: { backgroundColor: "white" },
          indicatorStyle: { backgroundColor: "green" },
          tabBarLabel: () => null,
          tabBarShowIcon: false,
          tabBarStyle: { marginTop: -40 },
        }}
      >
        <Tab.Screen
          name="Image-1"
          component={ImageScreen1}
          options={{ gestureEnabled: false }}
        />
        <Tab.Screen
          name="Image-2"
          component={ImageScreen2}
          options={{ gestureEnabled: false }}
        />
        <Tab.Screen
          name="Image-3"
          component={ImageScreen3}
          options={{ gestureEnabled: false }}
        />
        <Tab.Screen
          name="Image-4"
          component={ImageScreen4}
          options={{ gestureEnabled: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 2,
    height: 10,
  },
  tabBarItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    paddingVertical: 0.5,
    borderBottomWidth: 4,
    borderBottomColor: "#ccc",
  },
  tabBarItemSelected: {
    borderBottomColor: "grey",
    backgroundColor: "#EDEEF1", // Background color for the selected tab
  },
});

export default Home;
