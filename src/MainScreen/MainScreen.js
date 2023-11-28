import { View, StyleSheet } from 'react-native';
import Menu from './Menu/Menu';
import Map from './Map/Map';
import { useState } from 'react';

export default function MainScreen() {
  const [coords, setCoords] = useState(null);

  return (
    <View style={styles.mainScreenContainer}>
      <Map coords={coords}/>
      <Menu setCoords={setCoords}/>
    </View>
  );
}

const styles = StyleSheet.create({
    mainScreenContainer: {
      width: "100%",
      height: "100%",
    },
});