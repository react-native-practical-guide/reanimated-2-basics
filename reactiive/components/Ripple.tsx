import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
}

const Ripple: FC<RippleProps> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  const aRef = useAnimatedRef<View>();

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: (tapEvent,) => {

      /* We want to find the layout of the View, 
      on the UI thread. */
      const layout = measure(aRef);
      width.value = layout.width;
      height.value = layout.height;

      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;

      rippleOpacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    },
    onActive: () => {
      /* onActive is a worklet, i.e. a JS func 
      that is executed in the UI thread.
      Thus in order to call the onTap we can:
      1. convert it to a worklet.
      2. call it asynchronously.  */
      if (onTap) runOnJS(onTap)()

    },
    // onEnd: () => {
    //   rippleOpacity.value = withTiming(0);
    // }
    /* Better use the onFinish, because if something goes wrong,
    the onEnd will not run. */
    onFinish: () => {
      rippleOpacity.value = withTiming(0);
    }
  });

  const rStyle = useAnimatedStyle(() => {
    /* We want to calculate the radius to be equal 
    to the square diagonal. So we use the Pythagorian theorium */
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: `rgba(0,0,0,0.2)`,
      opacity: rippleOpacity.value,
      top: 0,
      left: 0,
      position: 'absolute',
      transform: [
        { translateX },
        { translateY },
        { scale: scale.value }
      ]
    }
  })
  return (
    <View ref={aRef} style={style}>
      <TapGestureHandler onGestureEvent={tapGestureEvent} >
        <Animated.View style={[style, { overflow: 'hidden' }]}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  )
}

export default Ripple

const styles = StyleSheet.create({})