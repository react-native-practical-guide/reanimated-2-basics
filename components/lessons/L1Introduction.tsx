import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`;
};

export default function L1Introduction() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(0.5, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      }),
      3,
      true
    );
    scale.value = withRepeat(withSpring(2, { damping: 20, stiffness: 90 }), 3, true);
  }, []);

  return (
    <Animated.View
      style={[
        {
          height: SIZE,
          width: SIZE,
          backgroundColor: "blue",
        },
        reanimatedStyle,
      ]}>
    </Animated.View>
  );
}
