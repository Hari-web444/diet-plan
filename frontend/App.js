import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

import HomeScreen from "./src/screens/HomeScreen";
import DietResult from "./src/screens/DietResult";
import NutritionScreen from "./src/screens/NutritionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
          headerTintColor: "#fff",
          headerBackground: () => (
            <LinearGradient
              colors={["rgb(5 ,86, 139)", "rgb(0 ,52, 85)"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DietResult" component={DietResult} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
