import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";

const Affirmations = ({ route }) => {
  const { affirmation } = route.params;
  return (
    // <ImageBackground
    //   source={{ uri: affirmation.background }}
    //   style={styles.background}
    // >
    // </ImageBackground>
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.contentText}>{affirmation.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  background: {
    // flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#82eefd",
  },
  contentText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

export default Affirmations;
