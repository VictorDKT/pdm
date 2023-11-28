import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LightSensor, Gyroscope } from 'expo-sensors';
import * as Location from 'expo-location';

export default function Menu({setCoords}) {
  const [illuminance, setIlluminance] = useState(0);
  const [lightLimiar, setLightLimiar] = useState(40);
  const [theme, setTheme] = useState("light");
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(()=>{
    Gyroscope.setUpdateInterval(5000);
    Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    })

    LightSensor.addListener((a)=>{
      if(a.illuminance <= lightLimiar) {
        setTheme("dark")
      } else if(a.illuminance > lightLimiar) {
        setTheme("light")
      }
      setIlluminance(a.illuminance)
    });
  }, [])

  return (
    <View style={ theme === "light" ? stylesLight.menuContainer: stylesDark.menuContainer }>
      <View>
        <Text style={ theme === "light" ? stylesLight.text: stylesDark.text }>Iluminação: {illuminance} lx</Text>
        <Text style={ theme === "light" ? stylesLight.text: stylesDark.text }>Giroscópio (x,y,z):</Text>
        <Text style={ theme === "light" ? stylesLight.text: stylesDark.text }>x: {x}</Text>
        <Text style={ theme === "light" ? stylesLight.text: stylesDark.text }>y: {y}</Text>
        <Text style={ theme === "light" ? stylesLight.text: stylesDark.text }>z: {z}</Text>
      </View>
      <TouchableOpacity 
        style={ theme === "light" ? stylesLight.button : stylesDark.button }
        onPress={async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Sem permissão', 'Para exibir sua localização é necessário permissão de acesso ao GPS.', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          } else {
            let location = await Location.getCurrentPositionAsync({});
            setCoords({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.0421,
            });
          }
        }}
      >
        <Text style={theme === "light" ? stylesLight.buttonText: stylesDark.buttonText }>Ver minha localização</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesLight = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    padding: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1AAFEC",
    paddingBottom: 10,
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  }
});

const stylesDark = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "rgb(50, 54, 57)",
    padding: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00008B",
    paddingBottom: 10,
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  }
});