import { View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import defaultStyles, { CIRCLE_RADIUS, SIZE } from "../styles/defaultStyles";

type ContextType = {
  translateX: number;
  translateY: number;
}

export default function L2PanGestureHandler() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;

    },
    onFinish: () => {
      const distance =
        Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })
  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.circle} >
        <PanGestureHandler onGestureEvent={panGestureEvent} >
          <Animated.View style={[defaultStyles.squareRgba, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}
