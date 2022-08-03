import React from "react";
import { View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import defaultStyles, { CIRCLE_RADIUS, SIZE } from "../styles/defaultStyles";
import { CtxType } from "../types/types";

export default function L2PanGestureHandler() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, CtxType>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onFinish: () => {
      /* Check if the distance is smaller than the circle radius. 
      Find the distance, by using the Pythagorean theorem */
      // const distance =
      //   Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      // console.log('distance', translateX.value, translateY.value);

      // if (distance < CIRCLE_RADIUS + SIZE / 2) {
      //   translateX.value = withSpring(0);
      //   translateY.value = withSpring(0);
      // }

      /* Naive way */
      const rad = CIRCLE_RADIUS + SIZE
      if (Math.abs(translateX.value) + Math.abs(translateY.value) < rad) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })
  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.circle} >
        <PanGestureHandler onGestureEvent={panGestureEvent} >
          <Animated.View style={[defaultStyles.squareRgba, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}
