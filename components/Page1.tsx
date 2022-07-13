import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import defaultStyles, { width } from '../styles/defaultStyles';

type Props = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const Page1: FC<Props> = ({ title, index, translateX }) => {

  const pageOffset = width * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }]
    }
  })
  return (
    <Animated.View style={[{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: `rgba(0,0,256,0.${index + 2})`,
      alignItems: 'center',
      justifyContent: 'center'
    }, rStyle]} >
      <Text style={defaultStyles.text} >{title}</Text>
    </Animated.View>
  )
}

export default Page1