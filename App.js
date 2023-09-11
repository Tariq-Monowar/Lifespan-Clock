import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CoundownClock from "./components/CoundownClock";
import SetCoundown from "./components/SetCoundown";
import CustomDrawer from "./drower/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        courgette: require("./assets/font/Courgette-Regular.ttf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="CoundownClock"
        component={CoundownClock}
        options={{
          title: "lifespan Clocks",
          headerTitle: "lifeSpan Clock",
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "#11111120",
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: fontLoaded ? "courgette" : "sans-serif",
          },
          drawerActiveBackgroundColor: "#396863e6",
          drawerInactiveBackgroundColor: "transparent",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#000",
          drawerItemStyle: {
            marginVertical: 5,
            borderRadius: 10,
          },
          drawerLabelStyle: {
            fontSize: 17,
            marginLeft: 10,
            fontWeight: "normal",
            fontFamily: fontLoaded ? "courgette" : "sans-serif",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        courgette: require("./assets/font/Courgette-Regular.ttf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"transparent"}
      />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetCoundown"
            component={SetCoundown}
            options={{
              headerTitle: "Set your Birthday",
              backgroundColor:"transparent",
              headerTitleAlign: "center", 
              headerTitleStyle: {
                fontSize: 22, 
                fontFamily: fontLoaded ? "courgette" : "sans-serif",
                backgroundColor: "#f6dca3",
              },
              headerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>          
    </>
  );
}

