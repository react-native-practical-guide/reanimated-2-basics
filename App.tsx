import { StyleSheet, View } from "react-native";
import { L1Introduction } from "./components/lessons";
import { L1Play } from "./components/playground";

export default function App() {
  return (
    // <View style={styles.container} >
    <View  >
      {/* <L1Introduction /> */}
      <L1Play />

      {/* <L2PanGestureHandler /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
