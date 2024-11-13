import React, { useState, useEffect } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar } from "react-native";
import HomeTabs from "./components/Tabs";
import Diary from "./screens/Diary";
import Edit from "./screens/Edit";
import Settings from "./screens/Settings";
import Auth from "./components/Auth";
import SignUp from "./screens/SignUp";
import BlogPostScreen from "./components/BlogPostScreen";
import ProgramDetails from "./components/ProgramDetails";
import MeditationTimer from "./components/MeditationTimer";
import Affirmations from "./components/Affirmations";
import { DContexts } from "./contexts/DContexts";
import Onboarding from "./components/Onboarding";
import { supabase } from "./lib/supabase";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import ChatbotScreen from "./screens/ChatbotScreen";
import Home from "./screens/Home";
import { Feather, Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [session, setSession] = useState(null);
  const [changedsomething, setChangedSomething] = useState("");
  const [primarycolor, setPrimaryColor] = useState("#8E5CE6");
  const [opacitycolor, setOpacityColor] = useState("#a089ff");
  const [bgcolor, setbgColor] = useState("#f5f5f5");
  const [cardcolor, setCardColor] = useState("white");
  const [txtcolor, settxtColor] = useState("black");
  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/poppins.ttf"),
  });

  // Load colors and hide splash screen
  useEffect(() => {
    const loadColors = async () => {
      try {
        const Defaults = {
          primaryColor: "#8E5CE6",
          opacityColor: "#a089ff",
          bgColor: "#f5f5f5",
          cardColor: "white",
          textColor: "black",
        };

        // Fetch colors from Secure Store
        const loadedPrimaryColor = await SecureStore.getItemAsync(
          "primarycolor"
        );
        const loadedOpacityColor = await SecureStore.getItemAsync(
          "opacitycolor"
        );
        const loadedBgColor = await SecureStore.getItemAsync("bgcolor");
        const loadedCardColor = await SecureStore.getItemAsync("cardcolor");
        const loadedTextColor = await SecureStore.getItemAsync("textcolor");

        // Check and save colors if they don't exist
        if (loadedPrimaryColor === null) {
          await SecureStore.setItemAsync("primarycolor", Defaults.primaryColor);
          setPrimaryColor(Defaults.primaryColor);
        } else {
          setPrimaryColor(loadedPrimaryColor);
        }

        if (loadedOpacityColor === null) {
          await SecureStore.setItemAsync("opacitycolor", Defaults.opacityColor);
          setOpacityColor(Defaults.opacityColor);
        } else {
          setOpacityColor(loadedOpacityColor);
        }

        if (loadedBgColor === null) {
          await SecureStore.setItemAsync("bgcolor", Defaults.bgColor);
          setbgColor(Defaults.bgColor);
        } else {
          setbgColor(loadedBgColor);
        }

        if (loadedCardColor === null) {
          await SecureStore.setItemAsync("cardcolor", Defaults.cardColor);
          setCardColor(Defaults.cardColor);
        } else {
          setCardColor(loadedCardColor);
        }

        if (loadedTextColor === null) {
          await SecureStore.setItemAsync("textcolor", Defaults.textColor);
          settxtColor(Defaults.textColor);
        } else {
          settxtColor(loadedTextColor);
        }
      } catch (error) {
        console.error("Error loading variables from Secure Store:", error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadColors();
  }, []);

  // Load session and listen for changes
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Hide splash screen after fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Function to update user display name
  const updateUserDisplayName = async (username) => {
    if (session?.user?.id) {
      const { error } = await supabase
        .from("users") // Ensure this is the correct table name
        .update({ "Display Name": username })
        .eq("UID", session.user.id); // Use UID as the primary key

      if (error) {
        console.error("Error updating display name:", error);
      }
    }
  };

  return (
    // <UserProvider>
    <DContexts.Provider
      value={{
        changedsomething,
        setChangedSomething,
        opacitycolor,
        setOpacityColor,
        primarycolor,
        setPrimaryColor,
        cardcolor,
        bgcolor,
        setbgColor,
        setCardColor,
        txtcolor,
        settxtColor,
        myuname: session?.user?.email?.split("@")[0] || "Guest", // Extract username from email
        updateUserDisplayName, // Expose the update function
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
            },
          }}
        >
          {session ? (
            <>
              <Stack.Screen
                name="Home Screen"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={ChatbotScreen}
                options={{ headerShown: true }}
              />

              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: true }}

              />
              <Stack.Screen
                name="Diary"
                component={Diary}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Edit"
                component={Edit}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BlogPostScreen"
                component={BlogPostScreen}
                options={{ title: "Blog Post" }}
              />
              <Stack.Screen
                name="ProgramDetails"
                component={ProgramDetails}
                options={{
                  title: "Program Details",
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="MeditationTimer"
                component={MeditationTimer}
                options={{
                  title: "Meditation Timer",
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="Affirmations"
                component={Affirmations}
                options={{
                  title: "Affirmations",
                  headerBackTitle: "Back",
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DContexts.Provider>
    // </UserProvider>
  );
}
