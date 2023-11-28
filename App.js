import { View, StyleSheet } from 'react-native';
import MainScreen from './src/MainScreen/MainScreen';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <MainScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    width: "100%",
    height: "100%",
  },
});