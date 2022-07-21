import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

/* Answer in comments from Reactiive, about the Wrapper function.
I believe that the issue is related with the "this" concept in JS. 
In particular, Reanimated, with the runOnJS function, 
calls a particular function called __callAsync. 
This function is automatically defined by Reanimated 
using the Object.defineProperty primitive. 
I believe (and I'm not sure at all) that __callAsync uses "this" inside it. 
However, in JS the meaning of "this" changes significantly 
depending on the context in which you run the function. 
So creating a "wrapperFunction" in a sense goes to "normalize" the execution context. 

Now, to be honest this is the explanation I have given myself but I am not absolutely sure. 

I attach below the link of the docs related to this topic:  https://docs.swmansion.com/react-native-reanimated/docs/next/api/miscellaneous/runOnJS/
*/

const ICON_SIZE = 20;
const COUNTER_WIDTH = 170;
const MAX_SLIDE_OFFSET = COUNTER_WIDTH * .3;

const clamp = (value: number, min: number, max: number) => {
  'worklet'
  return Math.min(Math.max(value, min), max);
}

const SlidingCounter = () => {
  const [count, setCount] = useState<number>(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /* Wrapper function */
  const incrementCount = () => {
    /* External Library function */
    (setCount)(prev => prev + 1);
  }
  const decrementCount = () => {
    /* External Library function */
    (setCount)(prev => prev - 1);
  }
  const resetCount = () => {
    /* External Library function */
    (setCount)(0);
  }

  const onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (e) => {
      console.log('e.translationX', e.translationX);
      console.log('MAX_SLIDE_OFFSET', MAX_SLIDE_OFFSET);

      translateX.value = clamp(e.translationX, -MAX_SLIDE_OFFSET, MAX_SLIDE_OFFSET);
      translateY.value = clamp(e.translationY, 0, MAX_SLIDE_OFFSET);
    },
    onEnd: () => {
      translateX.value = withSpring(0, { stiffness: 300 });
      translateY.value = withSpring(0, { stiffness: 300 });
      if (translateY.value === MAX_SLIDE_OFFSET)
        runOnJS(resetCount)();
      else if (translateX.value === MAX_SLIDE_OFFSET)
        /* This could fail! */
        // runOnJS(setCount)(prev => prev + 1);
        runOnJS(incrementCount)();
      else if (translateX.value === -MAX_SLIDE_OFFSET)
        runOnJS(decrementCount)();
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  });

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 1, 0.4]);

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0]);

    return {
      opacity: opacityX * opacityY,
    }
  });

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 1]);

    return {
      opacity
    }
  });

  const rCounterStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * .1 },
        { translateY: translateY.value * .1 },
      ]
    }
  })

  return (
    <Animated.View style={[styles.counterContainer, rCounterStyle]} >
      <Animated.View style={rPlusMinusIconStyle} >
        <AntDesign size={ICON_SIZE} name='minus' color='white' />
      </Animated.View>
      <Animated.View style={rCloseIconStyle} >
        <AntDesign size={ICON_SIZE} name='close' color='white' />
      </Animated.View>
      <Animated.View style={rPlusMinusIconStyle} >
        <AntDesign size={ICON_SIZE} name='plus' color='white' />
      </Animated.View>
      <View style={styles.circleContainer} >
        <PanGestureHandler onGestureEvent={onPanGestureEvent} >
          <Animated.View style={[styles.circle, rStyle]} >
            <Text style={styles.circleText} >{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  )
}

export default SlidingCounter

const styles = StyleSheet.create({
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: '#1a497e',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleText: {
    color: '#fff',
    fontSize: 25.
  },
  counterContainer: {
    height: 70,
    width: COUNTER_WIDTH,
    backgroundColor: '#111111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
})