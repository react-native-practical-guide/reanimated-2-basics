import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;

// const handleRotation = (progress: Animated.SharedValue<number>) => {
const handleRotation = (progress) => {
  "worklet";

  return `${progress.value * 2 * Math.PI}rad`;
};

export default function App() {
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
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: SIZE,
            width: SIZE,
            backgroundColor: "blue",
          },
          reanimatedStyle,
        ]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
