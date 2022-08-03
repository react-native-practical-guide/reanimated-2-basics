import { StyleSheet } from 'react-native'
import React, { FC, useCallback } from 'react'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { CtxType2 } from '../types/types'
import COLORS from '../constants/colors'

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_CIRCLE_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

interface ColorPickerProps extends LinearGradientProps {
  maxHeight: number;
  maxWidth: number;
  onColorChange: (color: string | number) => void;
  onOpacityChange: (opacity: number) => void;
  pickerColor: string | number;
}

const OpacityPicker: FC<ColorPickerProps> = ({ pickerColor, start, end, colors, onColorChange, onOpacityChange, style, maxHeight, maxWidth }) => {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  /* Create a clamp worklet to resuse the below function. */
  const adjustTranslateX = useDerivedValue(() => {
    /* Avoid negative values, the the picker cannot go to the left. */
    return Math.min(Math.max(translateX.value, 0), maxWidth - CIRCLE_PICKER_SIZE);
  });

  const onEnd = useCallback(() => {
    'worklet';
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, [])

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, CtxType2>({
    onStart: (_, context) => {
      context.x = adjustTranslateX.value;
      // translateY.value = withSpring(CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd
  });

  const rStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, i) => (i / 2) * maxWidth);

    const backgroundColor = interpolateColor(translateX.value,
      inputRange,
      colors
    );
    onColorChange?.(backgroundColor);

    return {
      backgroundColor,
      transform: [
        { translateX: adjustTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    }
  });

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: (event) => {
      translateY.value = withSpring(- CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },
    onEnd
  })

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = COLORS.map((_, i) => ((i + 1) / 9) * maxWidth);

    const opacity = interpolateColor(translateX.value,
      inputRange,
      [1, 0]
    );
    onOpacityChange?.(opacity);
    return {
      backgroundColor: pickerColor,
      opacity
    }
  });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent} >
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}  >
          <Animated.View style={{ justifyContent: 'center' }} >
            <LinearGradient
              colors={colors}
              start={start}
              end={end}
              style={style} />
            <Animated.View style={[styles.picker, rStyle]} >
              <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}
const styles = StyleSheet.create({
  internalPicker: {
    position: 'absolute',
    width: INTERNAL_CIRCLE_PICKER_SIZE,
    height: INTERNAL_CIRCLE_PICKER_SIZE,
    borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: `rgba(0,0,0,0.2)`
  },
  picker: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2
  }
})

export default OpacityPicker;