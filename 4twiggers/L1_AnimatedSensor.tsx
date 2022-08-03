import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedSensor,
  useAnimatedStyle,
  SensorType,
} from 'react-native-reanimated';
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';


/* CAUTION
On iOS, if you want to read sensor data you need to enable location services on your device (Settings > Privacy > Location Services). */
const BORDER_RADIUS = 20;
const INTENSITY = 30;

const CARD_WIDTH = 230;
const CARD_HEIGHT = 380;

export default function L1_AnimatedSensor() {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });

  const style = useAnimatedStyle(() => {
    const { pitch, yaw } = animatedSensor.sensor.value;

    let yawValue =
      30 * (yaw < 0 ? 2.5 * Number(yaw.toFixed(2)) : Number(yaw.toFixed(2)));

    let pitchValue = 36 * pitch.toFixed(2);

    return {
      transform: [{ translateX: pitchValue }, { translateY: yawValue }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imageStyle} source={require('./assets/1290.png')} />
      <BlurView intensity={INTENSITY} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.animatedViewStyle, style]}>
        <Image style={{ flex: 1 }} source={require('./assets/1290.png')} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  animatedViewStyle: {
    width: CARD_WIDTH + 20,
    height: CARD_HEIGHT + 20,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const value = animatedSensor.sensor.value;
/* value =
Object {
  "pitch": -0.010655161509680775,
  "qw": 0.0069248898412218075,
  "qx": 0.01239353537383139,
  "qy": 0.9921021731923262,
  "qz": 0.12462654940478421,
  "roll": 2.8918047119748866,
  "yaw": 0.026320395869519647,
} */