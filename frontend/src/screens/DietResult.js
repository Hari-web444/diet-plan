import React, { useRef } from "react";
import { View, Text, Animated, ScrollView, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DietResult({ route }) {
  const { plan } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>7-Day Plan</Text>

      {Object.keys(plan).map((dayKey, idx) => {
        const day = plan[dayKey];
        const scale = useRef(new Animated.Value(1)).current;

        // Animate when user presses the card
        const handlePressIn = () => {
          Animated.spring(scale, {
            toValue: 1.05,   // zoom in
            friction: 5,
            useNativeDriver: true,
          }).start();
        };

        const handlePressOut = () => {
          Animated.spring(scale, {
            toValue: 1,      // zoom out
            friction: 5,
            useNativeDriver: true,
          }).start();
        };

        return (
          <Pressable
            key={dayKey}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <LinearGradient
                colors={["rgb(204 ,235, 255)", "rgb(134 ,203 ,247)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.dayHeader}>
                  DAY {idx + 1} — {day.total_calories} kcal
                </Text>

                <View style={styles.mealContainer}>
                  {Object.keys(day.meals).map((mn) => (
                    <View key={mn} style={styles.mealBlock}>
                      <Text style={styles.mealName}>{mn}</Text>
                      <Text style={styles.mealText}>
                        {day.meals[mn].items.join(", ")}
                      </Text>
                      <Text style={styles.mealText}>
                        Calories: {day.meals[mn].calories}
                      </Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </Animated.View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fbff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(5, 86, 139)",
    marginBottom: 20,
  },
  card: {
    borderWidth: 0,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    boxShadow: "rgb(0 114 188) 0px 1px 5px",
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    padding: 16,
    borderRadius: 10,
  },
  dayHeader: {
    fontWeight: "700",
    fontSize: 18,
    color: "rgb(5, 86, 139)",
    marginBottom: 10,
  },
  mealContainer: {
    gap: 8,
  },
  mealBlock: {
    marginBottom: 10,
  },
  mealName: {
    fontWeight: "700",
    fontSize: 16,
    color: "rgb(5, 86, 139)",
  },
  mealText: {
    color: "rgb(4 ,88 ,142)",
  },
});
