import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const SIZE = 100;
const handleRotation = (rotate: Animated.SharedValue<number>) => {
  "worklet";
  return `${rotate.value}rad`
}

const L1Play = () => {
  const top = useSharedValue(20);
  const left = useSharedValue(20);
  const rotate = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      left: left.value,
      transform: [{ rotate: handleRotation(rotate) }]
    };
  }, []);

  useEffect(() => {
    top.value = withTiming(500, { duration: 1000 })
    rotate.value = withSpring(2);

    left.value = withDelay(1000, withTiming(250, { duration: 1000 }))
    rotate.value = withDelay(1000, withSpring(-2));

    top.value = withDelay(2000, withTiming(20, { duration: 1000 }))
    rotate.value = withDelay(2000, withSpring(4));

    left.value = withDelay(3000, withTiming(20, { duration: 1000 }))
    rotate.value = withDelay(3000, withSpring(0));

  }, [])

  return (
    <Animated.View
      style={[styles.square, animStyle]}
    >
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    backgroundColor: 'blue',
  }
})


export default L1Play