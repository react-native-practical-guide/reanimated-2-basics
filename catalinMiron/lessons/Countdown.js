import * as React from "react";
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
const { width, height } = Dimensions.get("window");
const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  text: "#ffffff",
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function Countdown() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const timerAnimation = React.useRef(new Animated.Value(height)).current;
  const textInputAnimation = React.useRef(
    new Animated.Value(timers[0])
  ).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const inputRef = React.useRef();

  const [duration, setDuration] = React.useState(timers[0]);

  React.useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  const animation = React.useCallback(() => {
    textInputAnimation.setValue(duration);

    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      textInputAnimation.setValue(duration);
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <View style={styles.numberContainer}>
        <Animated.Text
          style={[
            styles.text,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}>
          {item}
        </Animated.Text>
      </View>
    );
  };

  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const buttonTranslateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.sink,
          { transform: [{ translateY: timerAnimation }] },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100,
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslateY }],
          },
        ]}>
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: "absolute",
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}>
        <Animated.View
          style={{
            position: "absolute",
            width: ITEM_SIZE,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            opacity: textOpacity,
          }}>
          <TextInput
            ref={inputRef}
            style={styles.text}
            defaultValue={duration.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE
            );
            console.log(timers[index]);

            setDuration(timers[index]);
          }}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          style={{ flexGrow: 0, opacity: buttonOpacity }}
          data={timers}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  numberContainer: {
    width: ITEM_SIZE,
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: "Menlo",
    color: colors.text,
    fontWeight: "900",
  },
});
