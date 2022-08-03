import React, { useEffect } from 'react'
import { View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import defaultStyles from '../styles/defaultStyles';

/* Drag the square and when you leave it, it springs back to where you draged it from. Then it slides to where you acually left it. */

type CtxType = {
  translateX: number;
  translateY: number;
}
const L2Play = () => {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const ctxXonStart = useSharedValue(0);
  const ctxYonStart = useSharedValue(0);
  const translateXPrev = useSharedValue(0);
  const translateYPrev = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, CtxType>({
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
      ctxXonStart.value = ctx.translateX;
      ctxYonStart.value = ctx.translateY;
    },
    onActive: (e, ctx) => {
      console.log('Start X', translateXPrev.value);
      console.log('Start Y', translateYPrev.value);
      translateX.value = e.translationX + ctx.translateX;
      translateY.value = e.translationY + ctx.translateY;
      translateXPrev.value = e.translationX + ctx.translateX;
      translateYPrev.value = e.translationY + ctx.translateY;
    },
    onFinish: () => {
      // translateX.value = withSpring(ctxXonStart.value);
      // translateY.value = withSpring(ctxYonStart.value);

      /* setTimeout works without side effects, but it's on the JS thread...  */
      // setTimeout(() => {
      // translateX.value = withDelay(1000, withTiming(translateXPrev.value));
      // translateY.value = withDelay(1000, withTiming(translateYPrev.value));
      // }, 1000);

      translateX.value = withSequence(withSpring(ctxXonStart.value), withTiming(translateXPrev.value));
      translateY.value = withSequence(withSpring(ctxYonStart.value), withTiming(translateYPrev.value));
      console.log('Finish X', translateXPrev.value);
      console.log('Finish Y', translateYPrev.value);

    }
  });

  const rSquare = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  });

  return (
    <View style={defaultStyles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[defaultStyles.squareRgba, rSquare]}
        />
      </PanGestureHandler>
    </View>
  )
}

export default L2Play