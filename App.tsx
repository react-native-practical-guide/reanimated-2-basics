import 'react-native-gesture-handler'; // IMPORTANT !!!
import React from 'react';
import { View } from "react-native";
import { L1Introduction, L2PanGestureHandler, L3ScrollView, L4InterpolateColors, L5DoubleTap, L6ScrollPanGesture, L8CirularProgress } from "./lessons";
import { L1Play, L2Play, L3Play, L7Play2, L7Play3 } from "./playground";
import L7ColorPicker from './lessons/L7ColorPicker';
import L7Play from './playground/L7Play';

export default function App() {
  return (
    <View style={{ flex: 1 }} >
      {/* <L1Introduction /> */}
      {/* <L1Play /> */}

      {/* <L2PanGestureHandler /> */}
      {/* <L2Play /> */}

      {/* <L3ScrollView /> */}
      {/* <L3Play /> */}

      {/* <L4InterpolateColors /> */}

      {/* <L5DoubleTap /> */}

      {/* <L6ScrollPanGesture /> */}

      {/* <L7ColorPicker /> */}
      {/* <L7Play /> */}
      {/* <L7Play2 /> */}
      {/* <L7Play3 /> */}

      <L8CirularProgress />
    </View>
  );
}


