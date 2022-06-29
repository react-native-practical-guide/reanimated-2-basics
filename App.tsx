import 'react-native-gesture-handler';
import { View } from "react-native";
import { L1Introduction, L2PanGestureHandler } from "./components/lessons";
import { L1Play } from "./components/playground";

export default function App() {
  return (
    <View style={{ flex: 1 }} >
      {/* <L1Introduction /> */}
      {/* <L1Play /> */}

      <L2PanGestureHandler />
    </View>
  );
}


