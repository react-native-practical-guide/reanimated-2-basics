import 'react-native-gesture-handler'; // IMPORTANT !!!
import { View } from "react-native";
import { L1Introduction, L2PanGestureHandler, L3ScrollView, L4InterpolateColors } from "./lessons";
import { L1Play, L2Play, L3Play } from "./playground";

export default function App() {
  return (
    <View style={{ flex: 1 }} >
      {/* <L1Introduction /> */}
      {/* <L1Play /> */}

      {/* <L2PanGestureHandler /> */}
      {/* <L2Play /> */}

      {/* <L3ScrollView /> */}
      {/* <L3Play /> */}

      <L4InterpolateColors />
    </View>
  );
}


