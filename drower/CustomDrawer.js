import React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking
} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import drowerData from "./drowerData";

const CustomDrawer = (props) => {

  const [fontLoaded] = useFonts({
    courgette: require("../assets/font/Courgette-Regular.ttf"),
  });

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      blurRadius={300}
      source={require("../assets/Light-Background-Best-Wallpaper-transformed.jpg")}
    >
      <DrawerContentScrollView {...props} style={{ backgroundColor: '#80d4ba4d' }}>
        
          <Image
            style={styles.drawer_image}
            source={require("../assets/image.png")}
          />
           <DrawerItemList {...props}/>
          {fontLoaded &&
            drowerData.map((data, index) => {
              const { text, item } = data;
              return (
                <View key={index} style={styles.drowerDataView}>
                  <Text
                    style={[
                      styles.drawerOptionText,
                      { fontFamily: "courgette" },
                    ]}
                  >
                    {text}
                  </Text>
                  {item.map((data) => {
                    return (
                      <TouchableOpacity 
                      key={data.item}
                      style={styles.touch_element}
                      onPress={() => { 
                        Linking.openURL(data.url) 
                      }}
                    >
                      <Image style={styles.touch_element_icon} source={data.logo}/>
                      <Text style={[styles.touch_element_text,{ fontFamily: "courgette" }]}>{data.item}</Text>
                    </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
  
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawer_image: {
    width: "100%",
    height: 200,
    borderBottomRightRadius: 20,
    marginTop: -34,
    marginBottom: 10
  },
  drawerOptionText: {
    marginLeft: -100,
    marginHorizontal: 15,
    opacity: .6,
    marginTop: 6,
    marginBottom: 6,
    fontSize: 18,
  },
  drowerDataView:{
    width: "100%",
    alignItems: "center"
  },
  touch_element:{
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#396863e6",
    height: 40,
    borderRadius: 8,
    marginVertical: 9

  },
  touch_element_icon:{
    width: 25,
    height: 25,
    marginHorizontal: 12
  },
  touch_element_text:{
    fontSize: 19,
    marginLeft: 7,
    color: "#fff"
  },
});
