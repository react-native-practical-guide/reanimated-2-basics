import React, { useEffect } from 'react'
import { View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import defaultStyles from '../styles/defaultStyles';

const L1Play1 = () => {
  const progress = useSharedValue(100);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(70, undefined, (finished, currentValue) => {
        if (finished) {
          console.log('current withRepeat value is ' + currentValue);
        } else {
          console.log('inner animation cancelled');
        }
      }),
      10,
      true,
      (finished) => {
        const resultStr = finished
          ? 'All repeats are completed'
          : 'withRepeat cancelled';
        console.log(resultStr);
      }
    );
  })

  const animStyle = useAnimatedStyle(() => {
    return {
      width: progress.value
    }
  })

  const tapGestrureHandler = useAnimatedGestureHandler({
    onStart() {
      cancelAnimation(progress)
    }
  })

  return (
    <View style={defaultStyles.container} >
      <TapGestureHandler onGestureEvent={tapGestrureHandler} >

        <Animated.View
          style={[defaultStyles.squareRgba, animStyle]}
        >
        </Animated.View>
      </TapGestureHandler>
    </View >
  )
}

export default L1Play1