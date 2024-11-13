// Onboarding.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Swiper from "react-native-swiper";

const Onboarding = ({ navigation }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      paginationStyle={styles.pagination}
      nextButton={<Text style={styles.buttonText}>Next</Text>}
      prevButton={<Text style={styles.buttonText}>Prev</Text>}
    >
      <View style={styles.slide}>
        <Text style={styles.title}>Welcome to HealCycle!</Text>
        <Text style={styles.description}>This is your personal health tracker.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Track Your Progress</Text>
        <Text style={styles.description}>Monitor your health metrics and goals.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Join Our Community</Text>
        <Text style={styles.description}>Connect with others and share your journey.</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate("Auth")}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  pagination: {
    bottom: 50,
  },
  buttonText: {
    marginTop: 550,
    color: "white",
    fontSize: 16,
    backgroundColor: "#8E5CE6",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default Onboarding;