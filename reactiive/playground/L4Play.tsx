import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import defaultStyles, { height } from '../styles/defaultStyles';

const WORDS = ['save', 'our', 'souls'];

const L3Play = () => {
  const lineWidth = useSharedValue(50);
  const translateTextX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    lineWidth.value = e.contentOffset.y / 7;
    translateTextX.value = e.contentOffset.y;
  });

  const rLineStyle = useAnimatedStyle(() => {
    return { width: lineWidth.value }
  });

  const rTextStyle = useAnimatedStyle(() => {
    return { fontSize: lineWidth.value - 130 }
  });

  const rTextViewStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      translateTextX.value,
      [height / 2, height, height * 2],
      [0, -50, 0]
    )
    return { transform: [{ translateX }, { translateY: translateX * 2 }] }
  });


  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {WORDS.map(el =>
        <View key={el} style={defaultStyles.page} >
          <Animated.View style={[styles.line, rLineStyle]} />
          <Animated.View style={rTextViewStyle} >
            <Animated.Text style={[defaultStyles.text, rTextStyle]} >{el}</Animated.Text>
          </Animated.View>
        </View>)}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  line: {
    height,
    position: 'absolute',
    backgroundColor: 'blue'
  },

})

export default L3Play