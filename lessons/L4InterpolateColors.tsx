import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import defaultStyles from "../styles/defaultStyles";

const colors = {
  dark: {
    background: '#1e1e1e',
    circle: '#725454',
    text: '#f8dfdf',
  },
  light: {
    background: '#f8f8f8',
    circle: '#d8c8ec',
    text: '#1e1e1e',
  }
}

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256, 0.2)',
  false: 'rgba(0,0,0, 0.1)'
}

type Theme = 'dark' | 'light';

export default function L4InterpolateColors() {
  const [theme, setTheme] = useState<Theme>('dark');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(0) : withTiming(1)
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.dark.background, colors.light.background])
    return { backgroundColor }
  });
  const rButtonColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.background, colors.dark.background])
    return { color }
  });

  return (
    <Animated.View style={[defaultStyles.container, rStyle]}>
      {/* <Switch value={theme === 'light'} onValueChange={(toggled) => {
        console.log('toggled', toggled, theme);
        setTheme(toggled ? 'light' : 'dark')
      }} /> */}
      <TouchableOpacity
        onPress={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      >
        <Animated.Text style={[{ fontSize: 50 }, rButtonColor]}>
          {theme === 'dark' ? 'light' : 'dark'}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
