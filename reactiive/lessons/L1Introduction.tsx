import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import defaultStyles, { SIZE } from "../styles/defaultStyles";

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`;
};

export default function L1Introduction() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(0.5, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      }),
      1,
      true
    );
    scale.value = withRepeat(withSpring(2, { damping: 20, stiffness: 90 }), 3, true);
  }, []);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  return (
    <View style={defaultStyles.container} >
      <Animated.View
        style={[defaultStyles.square, reanimatedStyle]}>
      </Animated.View>
    </View>
  );
}
