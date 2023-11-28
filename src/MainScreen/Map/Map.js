import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function Map({coords}) {
  const [data, setData] = useState();
  useEffect(()=>{
    setData(null)
    setTimeout(()=>{
      setData(coords)
    }, 200)
  }, [coords])

  return (
    <View style={styles.mapContainer}>
      <MapView 
      style={styles.map} 
      region={data}
      z
      >
        {data &&
          <Marker
            coordinate={{latitude: data.latitude, longitude: data.longitude}}
          />
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    mapContainer: {
      width: "100%",
      height: "60%",
    },
    map: {
      width: '100%',
      height: '100%',
    },
});