import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

/* This is not working! */
export default function L5DoubleTap() {
  const doubleTapRef = useRef();

  return (
    <Animated.View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={() => {
        console.log('SINGLE TAP');

      }}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            console.log('DOUBLE TAP');

          }}
        >
          <Animated.View style={{ width: 100, height: 100, backgroundColor: "red" }} />

        </TapGestureHandler>
      </TapGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});