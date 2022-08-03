import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';
import defaultStyles, { height, width } from '../styles/defaultStyles';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1Fa';
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function L8CirularProgress() {
  const progress = useSharedValue(0);

  /* Usually we use the useAnimatedStyle ...
  but because here in AnimatedCircle we want to animate a property,
  we use useAnimatedProps.  */
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
  }, [])

  return (
    <View style={styles.container} >
      {/* With just <Text /> we don't see anything on the UI, 
      because the progressText, is animating in the UI thread.
      So we use <ReText /> from redash to see the text in the JS thread. */}
      {/* <Text style={defaultStyles.text} >{progressText.value}</Text> */}

      {/* The <ReText /> is actually an animated text input, 
      with the text being animated on the UI thread, via the useAnimatedProps hook.*/}
      <ReText style={defaultStyles.text} text={progressText} />
      <Svg style={{ position: 'absolute' }} >
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          // strokeDashoffset={CIRCLE_LENGTH * .1}
          animatedProps={animatedProps} // exists because of createAnimatedComponent
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button} >
        <Text style={styles.buttonText} >Run</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -280,
    width: width * 0.7,
    height: 70,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25
  },
  buttonText: {
    fontSize: 25,
    color: '#fff',
    letterSpacing: 2.0
  }
})