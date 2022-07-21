import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Square from '../components/Square';
import { N } from '../constants/clockConstants';


export default function L12SlidingCounter() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(4 * Math.PI,
      {
        duration: 8000,
        easing: Easing.linear
      }), -1); // -1 === Infinity
  }, [])
  return (
    <View style={styles.container} >
      <StatusBar style='inverted' />
      {new Array(N).fill(0).map((_, index) =>
        <Square key={index} index={index} progress={progress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: 'center',
    justifyContent: 'center',
  },
})