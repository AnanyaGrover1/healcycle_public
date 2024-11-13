import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { DContexts } from "../contexts/DContexts";

const useStyles = () => {
  const { bgcolor, txtcolor } = useContext(DContexts);

  return StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: bgcolor,
      paddingTop: 15,
    },
    greytext: {
      color: "grey",
      fontSize: 13,
      margin: 5,
    },
    txt: {
      color: txtcolor,
    },
    pagetitle: {
      margin: 10,
      marginRight: 25,
      marginTop: 25,
      fontSize: 26,
      color: txtcolor,
      fontWeight: "bold",
    },
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginBottom: 10,
    },
    initialsContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#8E5CE6",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    initialsText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    userInfo: {
      flex: 1,
    },
    username: {
      fontSize: 18,
      fontWeight: "bold",
    },
    email: {
      color: "gray",
    },
    sectionContainer: {
      padding: 5,
      marginBottom: 10,
    },
    chsroll: {
      padding: 5,
    },
    cta: {
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      borderRadius: 15,
    },
  });
};

export default useStyles;