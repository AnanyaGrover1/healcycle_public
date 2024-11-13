// Medidation Timer
import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";

const MeditationTimer = ({ route }) => {
  const { meditation } = route.params;
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    setIsActive(true);
    setTimer(
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timer);
  };

  const handleDurationChange = (duration) => {
    setTime(duration);
  };

  const formattedTimeMinutes = String(Math.floor(time / 60)).padStart(2, "0");
  const formattedTimeSeconds = String(time % 60).padStart(2, "0");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: meditation.background }} // Ensure this points to a valid image URL
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>
              {formattedTimeMinutes}:{formattedTimeSeconds}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={isActive ? stopTimer : startTimer}
            >
              <Text style={styles.buttonText}>
                {isActive ? "Pause" : "Start"}
              </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Select Duration:</Text>

          <View style={styles.durationContainer}>
            <Pressable
              style={styles.durationButton}
              onPress={() => handleDurationChange(60)}
            >
              <Text style={styles.durationText}>1 min</Text>
            </Pressable>
            <Pressable
              style={styles.durationButton}
              onPress={() => handleDurationChange(300)}
            >
              <Text style={styles.durationText}>5 min</Text>
            </Pressable>
            <Pressable
              style={styles.durationButton}
              onPress={() => handleDurationChange(600)}
            >
              <Text style={styles.durationText}>10 min</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  label: {
    fontSize: 20,
    marginTop: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  durationContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  durationButton: {
    backgroundColor: "rgba(52, 152, 219, 0.7)",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  durationText: {
    color: "white",
    fontSize: 16,
  },
  timerContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  timer: {
    fontSize: 90,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default MeditationTimer;