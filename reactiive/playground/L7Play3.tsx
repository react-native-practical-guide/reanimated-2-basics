import React, { useCallback, useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import Animated, { AnimateProps, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Slider, { SliderProps } from '@react-native-community/slider';

import ColorPickerPlay from '../components/ColorPickerPlay';
import COLORS from '../constants/colors';
import defaultStyles, { height } from '../styles/defaultStyles';
import toColor from '../utils/toColor';

const BACKGROUND_COLOR = `rgba(0,0,0,0.3)`;
const PICKER_HEIGHT = height * 0.8;
const PICKER_WIDTH = 250;
const AnimatedSlider = Animated.createAnimatedComponent(Slider);

const L7Play = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[COLORS.length]);
  const [range, setRange] = useState<number>(1);
  const [sliding, setSliding] = useState<string>('Inactive');
  const [savedBackgroundColor, setSavedBackgroundColor] = useState<string | number>(0);
  const [savedBackgroundOpacity, setSavedBackgroundOpacity] = useState<number>(0);

  useEffect(() => {
    setSavedBackgroundColor(pickedColor.value);
    setSavedBackgroundOpacity(range);
  }, [pickedColor.value, range]);

  const onColorChanged = (color: string | number) => {
    'worklet'
    pickedColor.value = color;
  }

  const rBackgroundColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value }
  });

  const rColorStyle = useAnimatedStyle(() => {
    return { color: pickedColor.value }
  });

  const saveColors = () => {
    console.log('>>> savedBackgroundColor',
      toColor(savedBackgroundColor).replace(/[^,]+(?=\))/, String((savedBackgroundOpacity).toFixed(2))));
  }

  let color: string | number = '000';
  if (pickedColor.value) color = toColor(pickedColor.value).replace(/[^,]+(?=\))/, String((savedBackgroundOpacity).toFixed(2)));

  const animatedProps = useAnimatedProps(() => ({
    minimumTrackTintColor: pickedColor.value,
    thumbTintColor: pickedColor.value
  }))

  return (
    <View style={styles.container}>
      <View style={styles.sample} >
        <View style={styles.save} >
          <Button
            title='Save'
            onPress={saveColors}
          />
        </View>

        <View style={styles.opacityContainer} >
          <Animated.Text
            style={[{ fontSize: 20, fontWeight: 'bold' }, { opacity: range }, rColorStyle]} >Opacity: {(range).toFixed(2)}
          </Animated.Text>
          <AnimatedSlider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            // minimumTrackTintColor={`#${color}`}
            // thumbTintColor={`#${color}`}
            animatedProps={animatedProps}
            maximumTrackTintColor="#fff"
            value={1}
            onSlidingStart={() => setSliding('Sliding')}
            onValueChange={value => setRange(value)}
            onSlidingComplete={() => setSliding('Inactive')}
          />
        </View>

        <Animated.View style={[{
          height: 500,
          width: 250,
        },
        { opacity: range },
          rBackgroundColorStyle
        ]}
        >
        </Animated.View >
      </View>

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
    top: -100
  },
  save: {
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
  opacityContainer: {
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