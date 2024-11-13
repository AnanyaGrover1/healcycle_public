// Auth.js
// Sign in Page
import React, { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../lib/supabase";

export default function Auth({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/healcycle_logo_circle.png")} style={styles.logo} />
      <Input
        label="Email"
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
      />
      <Input
        label="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <Button
        title="Sign In"
        disabled={loading}
        onPress={signInWithEmail}
        buttonStyle={styles.cta}
      />
      <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
        New user? Sign up here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  link: {
    color: "#8E5CE6",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 10,
  },
  cta: {
    marginTop: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },
});