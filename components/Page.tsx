import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import defaultStyles, { height, SIZE07, width } from '../styles/defaultStyles'

type Props = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

export default function Page({ title, index, translateX }: Props) {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rPageStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP);
    const borderRadius = interpolate(translateX.value, inputRange, [0, SIZE07 / 2, 0], Extrapolate.CLAMP)
    return { borderRadius, transform: [{ scale }] }
  });

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    const translateY = interpolate(translateX.value, inputRange, [height / 2, 0, -height / 2])
    return { opacity, transform: [{ translateY }] }
  })

  return (
    <View style={[{ backgroundColor: `rgba(0,0,256, 0.${index + 2})` }, styles.page]} >
      <Animated.View style={[defaultStyles.square07, rPageStyle]} />
      <Animated.View style={[{ position: 'absolute' }, rTextStyle]} >
        <Text style={styles.text} >{title}</Text>
      </Animated.View>
    </View >
  )
}

const styles = StyleSheet.create({
  page: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700'
  }
})