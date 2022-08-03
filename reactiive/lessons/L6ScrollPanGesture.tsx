import React, { ContextType, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated';
import Page1 from '../components/Page1';
import WORDS from '../constants/words';
import { width } from '../styles/defaultStyles';
import { CtxType2 } from '../types/types';

const MAX_TRANSLATE_X = - width * (WORDS.length - 1);

export default function L6ScrollPanGesture() {
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X)
  });

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, CtxType2>({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX })
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <PanGestureHandler onGestureEvent={panGestureEvent} >
        <Animated.View style={{ flex: 1, flexDirection: 'row' }} >
          {WORDS.map((word, i) =>
            <Page1
              key={i.toString()}
              index={i}
              title={word}
              translateX={clampedTranslateX}

            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}