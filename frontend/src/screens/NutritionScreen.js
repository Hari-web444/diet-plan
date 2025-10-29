import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import chapathi from "../assets/images/chapathi.png";

export default function NutritionScreen() {
  const [items, setItems] = useState("Chapathi: 4 pieces\nPotato Kuruma: 200 g");
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const callApi = async () => {
    const lines = items.split("\n").map((l) => {
      const parts = l.split(":");
      return { item: parts[0].trim(), quantity: (parts[1] || "1 unit").trim() };
    });

    try {
      const res = await axios.post("http://10.68.172.233:8080/nutrition", {
        foods: lines,
      });
      setResult(res.data.meal_nutrition);
      setShowPopup(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } catch (e) {
      alert("API error: " + e.message);
    }
  };

  const closePopup = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowPopup(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 ,height: "100%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nutrition Analyzer</Text>
        <Text style={{ marginTop: 12, marginBottom: 12 }}>
          Enter one item per line like: Chapathi: 4 pieces
        </Text>

        <Image
          source={chapathi}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginBottom: 18,
          }}
        />

        <TextInput
          value={items}
          onChangeText={setItems}
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "rgb(0,70,113)",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            width: "100%",
            padding: 10,
            marginBottom: 22,
            textAlignVertical: "top",
            textAlign: "center"
          }}
          multiline
          numberOfLines={2}
          
        />

        <View style={styles.buttonWrapper}>
          <Pressable onPress={callApi}>
            <LinearGradient
              colors={["rgb(5,79,128)", "rgb(0,56,91)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Analyze Nutrition</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* ✅ Custom Popup */}
      {showPopup && (
        <Animated.View style={[styles.popupOverlay, { opacity }]}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Nutrition Breakdown</Text>

            {result ? (
              <ScrollView style={{ maxHeight: 300 }}>
                <View style={{ gap: "6px" }} >
                  <Text>Total Calories: {result.total_calories}</Text>
                  <Text>Protein: {result.macros.protein} g</Text>
                  <Text>Carbs: {result.macros.carbs} g</Text>
                  <Text>Fat: {result.macros.fat} g</Text>
                </View>
                <View style={{ height: 10 }} />
                {result.breakdown.map((b) => (
                  <View key={b.item} style={styles.itemRow}>
                    <Text style={styles.itemTitle}>{b.item}</Text>
                    <Text style={styles.itemSub}>
                      Calories: {b.calories} | P: {b.protein} | C: {b.carbs} | F:{" "}
                      {b.fat}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>Loading...</Text>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgb(152,214,255)",
    overflow: "hidden",
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popupBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "rgb(5,79,128)",
  },
  itemRow: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    gap: 6
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  itemSub: {
    color: "#555",
  },
  closeButton: {
    backgroundColor: "rgb(5,79,128)",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
