// import React, { useContext } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import { DContexts } from "../contexts/DContexts"; // Import your context

// const FeatureCard = ({ title, color }) => (
//   <TouchableOpacity style={[styles.featureCard, { backgroundColor: color }]}>
//     <View style={styles.featureContent}>
//       <Text style={styles.featureText}>{title}</Text>
//     </View>
//   </TouchableOpacity>
// );

// const Dashboard = () => {
//   const { bgcolor, txtcolor } = useContext(DContexts); // Access theme colors

//   const features = [
//     { title: "Journal & Log Symptoms", color: "#A368FF" },
//     { title: "Track Insights", color: "#C288FF" },
//     { title: "Consult a doctor", color: "#FF8F7A" },
//     { title: "Browse Health Resources", color: "#FFAE7A" },
//   ];

//   return (
//     <View style={[styles.container, { backgroundColor: bgcolor }]}>
//       <View style={styles.line} />
//       <Text style={[styles.title, { color: txtcolor }]}>Explore features</Text>
//       <ScrollView
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {features.map((feature, index) => (
//           <FeatureCard key={index} title={feature.title} color={feature.color} />
//         ))}
//       </ScrollView>
//       <View style={styles.line} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//     marginLeft: 20,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   featureCard: {
//     width: 180,
//     height: 130,
//     borderRadius: 20,
//     marginRight: 15,
//     padding: 15,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   featureContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   featureText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   line: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginHorizontal: 20,
//     marginVertical: 10,
//   },
// });

// export default Dashboard;


import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import { DContexts } from "../contexts/DContexts";

const FeatureCard = ({ title, color, onPress }) => (
  <TouchableOpacity
    style={[styles.featureCard, { backgroundColor: color }]}
    onPress={onPress}
  >
    <View style={styles.featureContent}>
      <Text style={styles.featureText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Dashboard = () => {
  const { bgcolor, txtcolor } = useContext(DContexts);

  const handleConsultDoctor = async () => {
    const email = 'contact@healcycle.com';
    const subject = 'Query for Doctor Consultation';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          "Error",
          "Could not open email client. Please make sure you have an email app installed.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error opening your email client.",
        [{ text: "OK" }]
      );
    }
  };

  const handleFeaturePress = (title) => {
    switch (title) {
      case "Consult a doctor":
        handleConsultDoctor();
        break;
      // Add cases for other features as needed
      default:
        break;
    }
  };

  const features = [
    { title: "Journal & Log Symptoms", color: "#A368FF" },
    { title: "Track Insights", color: "#C288FF" },
    { title: "Consult a doctor", color: "#FF8F7A" },
    { title: "Browse Health Resources", color: "#FFAE7A" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: bgcolor }]}>
      <View style={styles.line} />
      <Text style={[styles.title, { color: txtcolor }]}>Explore features</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            color={feature.color}
            onPress={() => handleFeaturePress(feature.title)}
          />
        ))}
      </ScrollView>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  featureCard: {
    width: 180,
    height: 130,
    borderRadius: 20,
    marginRight: 15,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default Dashboard;