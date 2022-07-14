import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useCallback } from 'react'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { height } from '../styles/defaultStyles'
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import COLORS_DESC from '../constants/colorsDesc'

const PICKER_WIDTH = 25;

interface ColorPickerProps extends LinearGradientProps {
  maxHeight: number;
  onColorChange?: (color: string | number) => void;
}

const ColorPickerPlay: FC<ColorPickerProps> = ({ colors, start, end, onColorChange, style, maxHeight }) => {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustTranslateX = useDerivedValue(() => {
    'worklet';
    return Math.min(
      /* No negative value. So picker does not go out of the gradient, on the top. */
      Math.max(translateX.value, 0),
      /* Keep picker in the gradient. No larger value than the PICKER_WIDTH. This is for the bottom. */
      maxHeight + (PICKER_WIDTH / 2))
  });

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>({
    onStart: (_, ctx) => {
      ctx.y = adjustTranslateX.value;
      translateY.value = withSpring(PICKER_WIDTH);
      scale.value = withSpring(1.2);
    },
    onActive: (e, ctx) => {
      console.log(e.translationY);
      translateX.value = e.translationY + ctx.y
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    }
  });

  const gradientStyle = useAnimatedStyle(() => {
    const inputRange =
      colors.map((_, i) => ((i / colors.length) * maxHeight) + (PICKER_WIDTH + 12));

    const borderBottomColor = interpolateColor(adjustTranslateX.value,
      inputRange,
      COLORS_DESC
    );
    onColorChange?.(borderBottomColor);
    return {
      borderBottomColor: borderBottomColor,
      transform: [
        { rotate: "90deg" },
        { translateX: adjustTranslateX.value - PICKER_WIDTH },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    }
  })


  return (
    <PanGestureHandler onGestureEvent={panGestureEvent} >
      <Animated.View style={{}} >
        <LinearGradient
          colors={colors}
          start={start}
          end={end}
          style={style}
        />
        <Animated.View style={[styles.picker, gradientStyle]} >
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: PICKER_WIDTH,
    borderRightWidth: PICKER_WIDTH,
    borderBottomWidth: PICKER_WIDTH * 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderRadius: 25,
    transform: [{ rotate: "90deg" }],
  }
})


export default ColorPickerPlay;