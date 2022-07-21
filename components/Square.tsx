import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { N, SQUARE_SIZE } from '../constants/clockConstants'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';

interface SquareProps {
  index: number;
  progress: Animated.SharedValue<number>;
}

const Square: FC<SquareProps> = ({ index, progress }) => {
  // console.log('full rotation', 2 * Math.PI);

  const offsetAngle = (2 * Math.PI) / N;
  // console.log('offsetAngle', offsetAngle);

  const finalAngle = offsetAngle * (N - 1 - index);
  // console.log('finalAngle 1', offsetAngle * index);
  // console.log('finalAngle 2', offsetAngle * (N - 1 - index));

  /* The rotation for each square 
    is equal to the minimun, between the final angle,
    and the progress.value. 
    The progress.value will increment from 0 to 2 * Pi.
    If the progress.value is less than the finalAngle, 
    we animate, other wise we keep the finalAngle. */
  // const rotate = Math.min(finalAngle, progress.value);

  /* Because the progress.value is a shared value, 
  we are forced to use the useDerivedValue hook.  */
  const rotate = useDerivedValue(() => {
    /* Handle second rotation. */
    if (progress.value <= 2 * Math.PI)
      return Math.min(finalAngle, progress.value);
    /* The rotation stays equal to the final angle until this condition */
    if (progress.value - 2 * Math.PI < finalAngle)
      return finalAngle;

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    /* If rotated animation is completed, 
    we want the translateY to stretch untill the radius amount. */
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    /* Flip the order of the squares */
    if (progress.value > 2 * Math.PI)
      return withTiming((index - N) * SQUARE_SIZE);

    return withTiming(-index * SQUARE_SIZE);
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        /* The rotation must come first! */
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ]
    }
  })

  return (
    <Animated.View key={index.toString()}
      style={[{
        height: SQUARE_SIZE,
        aspectRatio: 1,
        backgroundColor: 'white',
        // opacity: (index + 1) / N, // We used it to improve development experience.
        position: 'absolute',
        transform: [
          /* The rotation must come first! */
          { rotate: `${finalAngle}rad` },
          { translateY: -index * SQUARE_SIZE },
        ]
      }, rStyle]}
    ></Animated.View>
  )
}

export default Square

const styles = StyleSheet.create({})