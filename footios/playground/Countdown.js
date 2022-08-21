import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Vibration,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  text: "#ffffff",
};

export default function Countdown() {
  const timerAnimation = useSharedValue(height);
  const buttonAnimation = useSharedValue(0);

  const [duration, setDuration] = useState(5);

  const animationHandler = () => {
    buttonAnimation.value = withTiming(1, { duration: 300 });

    timerAnimation.value = withSequence(
      withDelay(300, withTiming(0, { duration: 300 })),
      (timerAnimation.value = withTiming(height, {
        duration: duration * 1000,
      }))
    );
    buttonAnimation.value = withDelay(
      duration * 1000,
      withTiming(0, { duration: 300 })
    );
    Vibration.cancel();
    Vibration.vibrate();
  };

  useEffect(() => {
    // animationHandler();
  }, [duration]);

  const sinkStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: timerAnimation.value }] };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(buttonAnimation.value, [0, 1], [1, 0]);
    const translateY = interpolate(buttonAnimation.value, [0, 1], [0, 200]);
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, styles.sink, sinkStyle]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100,
          },
          buttonStyle,
        ]}>
        <TouchableOpacity onPress={animationHandler}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  sink: {
    height: height,
    width: width,
    backgroundColor: colors.red,
  },
});
