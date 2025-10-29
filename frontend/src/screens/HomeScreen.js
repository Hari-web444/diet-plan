import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
  ImageBackground
} from "react-native";
import axios from "axios";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("78");
  const [goal, setGoal] = useState("Weight Loss");
  const [region, setRegion] = useState("South India");
  const [cuisine, setCuisine] = useState("Vegetarian");

  // ✅ Backend URL (auto-adjusts for Android emulator)
  const BASE_URL =
    Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://10.68.172.233:8080";

  const callApi = async () => {
    const payload = {
      name,
      age: parseInt(age),
      goal,
      height_cm: parseFloat(height),
      current_weight_kg: parseFloat(weight),
      region,
      cuisine_preference: cuisine,
    };

    try {
      const res = await axios.post(`${BASE_URL}/diet-plan`, payload);
      navigation.navigate("DietResult", { plan: res.data.daily_plan });
    } catch (e) {
      console.error("API Error:", e.response ? e.response.data : e.message);
      Alert.alert("Error", "Unable to connect to backend. Check your Wi-Fi or backend status.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg_gym.jpg")} // 👈 your background image path
      style={styles.container}
      resizeMode="cover" // or "stretch", "contain"
    >
      <BlurView intensity={35} tint="dark" style={styles.container}>
        <ScrollView style={styles.icontainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Diet Plan Generator</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              placeholderTextColor="rgb(179 ,177 ,177)"
              onChangeText={setName}
              style={styles.input}
              placeholder="Your name" />

            <Text style={styles.label}>Age</Text>
            <TextInput
              value={age}
              placeholderTextColor="rgb(179 ,177 ,177)"
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Your age"
            />

            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              value={height}
              placeholderTextColor="rgb(179 ,177 ,177)"
              onChangeText={setHeight}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              value={weight}
              placeholderTextColor="rgb(179 ,177 ,177)"
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Goal</Text>
            <TextInput
              value={goal}
              placeholderTextColor="rgb(179 ,177 ,177)"
              onChangeText={setGoal}
              style={styles.input}
              placeholder="e.g., Weight Loss"
            />

            <Text style={styles.label}>Region</Text>
            <TextInput value={region}
              placeholderTextColor="rgb(179 ,177 ,177)" onChangeText={setRegion} style={styles.input} />

            <Text style={styles.label}>Cuisine Preference</Text>
            <TextInput value={cuisine}
              placeholderTextColor="rgb(179 ,177 ,177)" onChangeText={setCuisine} style={styles.input} />

            <View style={styles.buttonWrapper}>
              <Pressable onPress={callApi}>
                <LinearGradient
                  colors={["rgb(185, 227 ,255)", "rgb(149 ,203 ,236)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Generate 7-Day Plan</Text>
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable onPress={() => navigation.navigate("Nutrition")} title="Go to Nutrition Analyzer" >
                <LinearGradient
                  colors={["rgb(185 ,227, 255)", "rgb(149, 203, 236)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Nutrition Analyzer</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  icontainer: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.37)"
  },
  innerContainer: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 432,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.85)", // optional translucent overlay
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(5 ,86, 139)",
    textTransform: "uppercase",
    textShadow: "#000 0px 3px 1px"
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    outlineStyle: "none",
    backgroundColor: "#000000b0"
  },
  buttonContainer: {
    marginVertical: 8,
  },
  buttonWrapper: {
    marginTop: 22,
    borderRadius: 6,
    boxShadow: "0px 0px 12px -4px rgb(32 158 239)",
    borderWidth: 1,
    borderColor: "rgb(152,214,255)",
    overflow: "hidden"
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "rgb(5, 86, 139)",
    fontSize: 16,
    fontWeight: "600",
  },


});
