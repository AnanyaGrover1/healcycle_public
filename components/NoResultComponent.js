import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import useStyles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { DContexts } from "../contexts/DContexts";
export default function NoResultComponent() {
  css = useStyles();
  const { primarycolor } = useContext(DContexts);
  return (
    <View style={css.noresdiv}>
      <Ionicons
        name="calendar-outline"
        size={200}
        style={{ marginBottom: 10, marginLeft: 100 }}
        color={primarycolor}
      />
      <Text style={{ ...styles.tpn3, ...css.txt }}>There are no entries yet!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tpn3: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 85,
  },
});
