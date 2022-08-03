import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { TaskInterface } from '../lessons/L9SwipeDelete'
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { FontAwesome5 } from '@expo/vector-icons';
import { width } from '../styles/defaultStyles'

/* extends Pick<PanGestureHandlerProps, 'simultaneousHandlers' =
jsut adding the simultaneousHandlers property. */
interface ListItemsProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;

}
const LIST_ITEM_HEIGHT = 70;
/* Because we scroll from right to left, the threshold is a negative value. */
const TRASLATE_X_THRESHOLD = -width * .3;

const ListItem: FC<ListItemsProps> = ({ task, onDismiss, simultaneousHandlers }) => {
  /* can be shared between the JS and the UI thread. */
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;

    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRASLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            /* Because the `onEnd` is a `worklet` function, 
            it will run on the UI thread. 
            So, in order to run the onDismis func, which runs on the JS thread,
            we need to use `runOnJS` where we can run a function,
            in the JS thread, asynchronously from a `worklet` function.  */
            runOnJS(onDismiss)(task);
          }
        });
      } else
        translateX.value = withTiming(0);
    }
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value }
    ]
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRASLATE_X_THRESHOLD ? 1 : 0);
    return { opacity }
  });

  const rTaskContainerStyle = useAnimatedStyle(() => ({ height: itemHeight.value, marginVertical: marginVertical.value, opacity: opacity.value }))

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]} >
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]} >
        <FontAwesome5
          name='trash-alt'
          size={LIST_ITEM_HEIGHT * .4}
          color='red'
        />
      </Animated.View>
      {/* We use `simultaneousHandlers` to fix the conflict 
      between the scroll and the PanGesture.
      Note: the issue is not fixed here though! */}
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture} >
        <Animated.View style={[styles.task, rStyle]} >
          <Text style={styles.taskTitle} >{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center'
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    elevation: 5
  },
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
  }
})

export default ListItem