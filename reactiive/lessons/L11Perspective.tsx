import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { width } from '../styles/defaultStyles';

const THRESHOLD = width / 3;

export default function L11Perspective() {

  const tranlateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
    onStart: (_, ctx) => {
      ctx.x = tranlateX.value;
    },
    onActive: (e, ctx) => {
      tranlateX.value = Math.max(e.translationX + ctx.x, 0);
    },
    onEnd: () => {
      if (tranlateX.value <= THRESHOLD)
        tranlateX.value = withTiming(0);
      else
        tranlateX.value = withTiming(width / 2);
    }
  });

  const rStyle = useAnimatedStyle(() => {

    const rotate = interpolate(tranlateX.value, [0, width / 2], [0, 2.5], Extrapolate.CLAMP);
    const borderRadius = interpolate(tranlateX.value, [0, width / 2], [0, 15], Extrapolate.CLAMP);

    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: tranlateX.value },
        { rotateY: `-${rotate}deg` }
      ]
    }
  });

  const onPress = useCallback(() => {
    if (tranlateX.value > 0) tranlateX.value = withTiming(0);
    else tranlateX.value = withTiming(width / 2);
  }, []);

  return (
    /* For Android we always need to use GestureHandlerRootView */
    <GestureHandlerRootView style={{ flex: 1 }} >
      <SafeAreaView style={styles.container}>
        <StatusBar style='inverted' />
        <PanGestureHandler onGestureEvent={panGestureEvent} >
          <Animated.View style={[{ backgroundColor: 'white', flex: 1 }, rStyle]} >
            <Feather onPress={onPress} name='menu' size={32} color='#1e1e23' style={{ margin: 15 }} />
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView >
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e23",
  },
})