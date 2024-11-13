import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Add from "../screens/Add";
import Settings from "../screens/Settings";
import { Feather, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { DContexts } from "../contexts/DContexts";
import HealthHub from "../screens/HealthHub";
import Insights from "../screens/Insights";
import ChatbotScreen from "../screens/ChatbotScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { primarycolor } = useContext(DContexts);
  const { bgcolor } = useContext(DContexts);
  const { cardcolor } = useContext(DContexts);

  return (
    <View style={{ backgroundColor: bgcolor, flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: primarycolor,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            marginRight: 10,
            marginLeft: 10,
            elevation: 10,
            borderRadius: 15,
            height: 75,
            backgroundColor: cardcolor,
            borderTopWidth: 0,
            alignItems: "center", // Align items to the center
            justifyContent: "center", // Justify content to the center
            display: "flex",

          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Health-Hub"
          component={HealthHub}
          options={{
            tabBarLabel: "Health Hub",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: primarycolor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                  top: -15,
                }}
              >
                <Ionicons name="add" color="#ffffff" size={size} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Insights"
          component={Insights}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tara Chatbot"
          component={ChatbotScreen}
          options={{
            tabBarLabel: "Chatbot",
            tabBarStyle:{display: "none"},
            // headerShown: "true",
            tabBarIcon: ({ color, size }) => (
              <Feather name="message-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
