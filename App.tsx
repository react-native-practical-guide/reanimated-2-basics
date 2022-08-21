import 'react-native-gesture-handler'; // IMPORTANT !!!
import React from 'react';
import { View } from "react-native";
import { L10RippleEffect, L11Perspective, L12SlidingCounter, L13Clock, L1Introduction, L2PanGestureHandler, L3ScrollView, L4InterpolateColors, L5DoubleTap, L6ScrollPanGesture, L8CirularProgress, L9SwipeDelete } from "./reactiive/lessons";
import { L1Play, L1Play1, L2Play, L3Play, L7Play2, L7Play3, L8Play } from "./reactiive/playground";
import { L2_BottomSheet } from './eveningkid/lessons';
import { L1_AnimatedSensor } from './4twiggers';
import { SaveOurSouls, TabMe, Countdown } from './footios/playground/intex';
// import { Countdown } from './catalinMiron/lessons';

export default function App() {
  return (
    <View style={{ flex: 1 }} >
      {/* /// REACTIIVE LESSONS ///*/}
      {/* <L1Introduction /> */}
      {/* <L1Play /> */}
      {/* <L1Play1 /> */}

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

      {/* <L8CirularProgress /> */}
      {/* <L8Play /> */}

      {/* <L9SwipeDelete /> */}

      {/* <L10RippleEffect /> */}

      {/* <L11Perspective /> */}

      {/* <L12SlidingCounter /> */}

      {/* <L13Clock /> */}


      {/* /////////////// */}
      {/* /// EVENING KID LESSONS ///*/}

      {/* <L2_BottomSheet /> */}

      {/* /////////////// */}
      {/* /// 4twiggers ///*/}
      {/* <L1_AnimatedSensor /> */}


      {/* /////////////// */}
      {/* Catalin Miron */}
      {/* <Countdown /> */}

      {/* ///////////////// */}
      {/* footios */}
      {/* <SaveOurSouls /> */}
      {/* <TabMe /> */}
      <Countdown />

    </View>

  );
}


