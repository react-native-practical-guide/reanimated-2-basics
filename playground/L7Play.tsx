import React, { useCallback, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPickerPlay from '../components/ColorPickerPlay';
import OpacityPicker from '../components/OpacityPicker';
import COLORS from '../constants/colors';
import defaultStyles, { height } from '../styles/defaultStyles';

const BACKGROUND_COLOR = `rgba(0,0,0,0.3)`;
const PICKER_HEIGHT = height * 0.8;
const PICKER_WIDTH = 250;

function toColor(num) {
  num >>>= 0;
  var b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16,
    a = ((num & 0xFF000000) >>> 24) / 255;
  return "rgba(" + [r, g, b, a].join(",") + ")";
}

const L7Play = () => {
  const [isBackgroundColor, setIsBackgroundColor] = useState<boolean>(false);
  const pickedColor = useSharedValue<string | number>(COLORS[COLORS.length]);
  const pickedOpacity = useSharedValue<number>(1);

  const onColorChanged = (color: string | number) => {
    'worklet'
    pickedColor.value = color;
  }

  const onOpacityChanged = useCallback((opacity: number) => {
    'worklet'
    pickedOpacity.value = opacity;
  }, []);

  const rColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value }
  });
  // const rColorStyle = useAnimatedStyle(() => {
  //   if (isBackgroundColor)
  //     return { backgroundColor: pickedColor.value }
  //   else
  //     return { color: pickedColor.value }
  // });

  const getTextStyle = () => {
    if (!isBackgroundColor) return rColorStyle
  }
  const getBackgroundStyle = () => {
    if (isBackgroundColor) return rColorStyle
  }

  const rOpacityStyle = useAnimatedStyle(() => {
    return { opacity: pickedOpacity.value }
  });

  const getBackgroundOpacityStyle = () => {
    if (isBackgroundColor) return rOpacityStyle
  }

  const getColorButtonName = () => {
    if (isBackgroundColor) return 'Text'
    else return 'Background'
  }

  let color: string | number = '000';
  if (pickedColor.value) color = toColor(pickedColor.value)
  console.log(color);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sample, rColorStyle, rOpacityStyle]} >
        {/* <View style={styles.button} >
          <Button
            title={getColorButtonName()}
            onPress={() => setIsBackgroundColor(prev => !prev)}
          />
        </View> */}


        <View style={styles.opacityGradientContainer} >
          <OpacityPicker
            colors={[`#${color}`, '#fff']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.opacityGradient}
            maxWidth={PICKER_WIDTH}
            maxHeight={PICKER_HEIGHT}
            onColorChange={onColorChanged}
            onOpacityChange={onOpacityChanged}
            pickerColor={color}
          />
        </View>
        {/* <Animated.Text
          style={[{ fontSize: 40, fontWeight: 'bold' }, getTextStyle()]} >{color}
        </Animated.Text> */}

      </Animated.View >
      <View style={[styles.gradientContainer]} >
        <ColorPickerPlay
          colors={COLORS}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxHeight={PICKER_HEIGHT}
          onColorChange={onColorChanged}
        />
      </View>

    </View >
  )
}
const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    backgroundColor: BACKGROUND_COLOR,
  },
  button: {
    position: 'absolute',
    bottom: -60
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradient: {
    height: PICKER_HEIGHT,
    width: 40,
    borderRadius: 20,
  },
  gradientContainer: {
    paddingRight: '5%',
  },
  opacityGradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  opacityGradientContainer: {
    position: 'absolute',
    top: -60,
  },
  sample: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 50,
    height: 500,
    width: 250,
    borderWidth: 1,
    borderColor: '#000',
  },
})

export default L7Play