import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const handleRotation = (soulRotate: Animated.SharedValue<number>, soul2: boolean) => {
  "worklet";
  if (soul2)
    return `${soulRotate.value * 2 * Math.PI + 45}rad`;
  else
    return `${soulRotate.value * 2 * Math.PI}rad`;
};

const { width, height } = Dimensions.get('window');
const SOUL_WIDTH = 88;
const SaveOurSouls = () => {
  const soulRotate = useSharedValue(0);
  const soulRotate2 = useSharedValue(0);
  const soulScale = useSharedValue(0);
  const soulOpacity = useSharedValue(0);
  const soulTranslateX = useSharedValue(0);
  const soulTranslateY = useSharedValue(0);

  useEffect(() => {
    soulScale.value = withRepeat(withTiming(8, { duration: 1000 }), -1, true);
    soulOpacity.value = withRepeat(withTiming(.8, { duration: 2000 }), -1, true);

    soulRotate.value = withRepeat(
      withTiming(.5, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      }),
      -1,
    );

    soulRotate2.value = withRepeat(
      withTiming(-1, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      }),
      -1,
    );
  }, [])

  const soulPanGestureEvent = useAnimatedGestureHandler
    <PanGestureHandlerGestureEvent,
      {
        translateX: number, translateY: number,
      }>({
        onStart(e, ctx) {
          ctx.translateX = soulTranslateX.value;
          ctx.translateY = soulTranslateY.value;
        },
        onActive(e, ctx) {
          soulTranslateX.value = e.translationX + ctx.translateX;
          soulTranslateY.value = e.translationY + ctx.translateY;
        },
        onEnd(e) {
          // soulTranslateX.value = withDecay({
          //   velocity: clamp(e.velocityX, 0, width / 2),
          //   // clamp: [0, width - SOUL_WIDTH], // optionally define boundaries for the animation
          // })
          // soulTranslateY.value = withDecay({
          //   velocity: clamp(e.velocityY, height, height / 2),
          //   // clamp: [0, height - SOUL_WIDTH], // optionally define boundaries for the animation
          // })

          soulTranslateX.value = withSpring(0);
          soulTranslateY.value = withSpring(0);
        }
      })

  const soulAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: soulTranslateX.value },
        { translateY: soulTranslateY.value },
        { rotate: handleRotation(soulRotate, false) }
      ]
    }
  })

  const soulAnimStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: soulTranslateX.value },
        { translateY: soulTranslateY.value },
        { rotate: handleRotation(soulRotate2, true) },
      ]
    }
  })

  const nousAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: soulOpacity.value,
      transform: [
        { scale: soulScale.value }
      ]
    }
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={soulPanGestureEvent} >
        <Animated.View >
          <Animated.View
            style={[styles.soul, soulAnimStyle]}
          />
          <Animated.View
            style={[styles.soul, styles.innersoul, soulAnimStyle2,]}
          >
            <Animated.View style={[styles.nous, nousAnimStyle]} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default SaveOurSouls

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192153'

  },
  nous: {
    width: 10,
    height: 10,
    backgroundColor: 'cyan',
    borderRadius: 5,
    borderWidth: 7,
    borderColor: 'cyan',
  },
  soul: {
    width: SOUL_WIDTH,
    height: SOUL_WIDTH,
    backgroundColor: '#ffff8a',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  innersoul: {
    opacity: 0.8,
    position: 'absolute',
    transform: [
      { scale: 0.5 }
    ]
  },
  soulImage: {
    width: SOUL_WIDTH,
    height: SOUL_WIDTH
  }
})