import React from 'react';
import {
  Button,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500
}
export default function L2_BottomSheet() {
  const dimensions = useWindowDimensions()
  const top = useSharedValue(dimensions.height)

  const style = useAnimatedStyle(() => {
    return {
      /* Just use withSpring here, and you don't need to use it anywhere else! */
      top: withSpring(top.value, SPRING_CONFIG)
    }
  })
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startTop: number }>({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height
      } else {
        top.value = dimensions.height / 2
      }
    }
  })

  return (
    <>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <Button
          title='Open sheet'
          onPress={() => {
            top.value = withSpring(
              dimensions.height / 2,
              SPRING_CONFIG
            )
          }}
        />
        <PanGestureHandler onGestureEvent={gestureHandler} >
          <Animated.View style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            // top: dimensions.height,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
          },
            style
          ]} >
            <Text>Sheet</Text>

          </Animated.View>
        </PanGestureHandler>

      </View>
    </>
  );
}