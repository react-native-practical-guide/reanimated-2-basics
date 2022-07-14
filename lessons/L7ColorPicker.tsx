import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker from '../components/ColorPicker';
import COLORS from '../constants/colors';
import { width } from '../styles/defaultStyles';

const BACKGROUND_COLOR = `rgba(0,0,0,0.9)`;
const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.8;

export default function L7ColorPicker() {

  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const onColorChanged = useCallback((color: string | number) => {
    'worklet'
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value }
  });

  return (
    <>
      <View style={l7styles.topContainer} >
        <Animated.View style={[l7styles.circle, rStyle]} />
      </View>
      <View style={l7styles.bottomContainer} >
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={l7styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChange={onColorChanged}
        />
      </View>
    </>
  );
}

export const l7styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20
  },
  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b334e'
  },
})