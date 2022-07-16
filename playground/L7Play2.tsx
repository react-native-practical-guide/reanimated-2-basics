import React, { useCallback, useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

import ColorPickerPlay from '../components/ColorPickerPlay';
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
  const pickedColor = useSharedValue<string | number>(COLORS[COLORS.length]);
  const [isBackgroundColor, setIsBackgroundColor] = useState<boolean>(false);
  const [range, setRange] = useState<number>(1);
  const [sliding, setSliding] = useState<string>('Inactive');
  const [savedTextColor, setSavedTextColor] = useState<string | number>(0);
  const [savedTextOpacity, setSavedTextOpacity] = useState<number>(0);
  const [savedBackgroundColor, setSavedBackgroundColor] = useState<string | number>(0);
  const [savedBackgroundOpacity, setSavedBackgroundOpacity] = useState<number>(0);

  useEffect(() => {
    if (isBackgroundColor) {
      setSavedBackgroundColor(pickedColor.value);
      setSavedBackgroundOpacity(range);
    }
    else {
      setSavedTextColor(pickedColor.value);
      setSavedTextOpacity(range);
    }
  }, [pickedColor.value, range]);

  // console.log('savedTextColor', savedTextColor);
  // console.log('savedBackgroundColor', savedBackgroundColor);


  const onColorChanged = (color: string | number) => {
    'worklet'
    pickedColor.value = color;
  }

  const rBackgroundColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value }
  });

  const rTextColorStyle = useAnimatedStyle(() => {
    return { color: pickedColor.value }
  })

  const getTextStyle = () => {
    if (!isBackgroundColor) return rTextColorStyle
  }

  const getBackgroundStyle = () => {
    if (isBackgroundColor) return rBackgroundColorStyle
  }

  const getColorButtonName = () => {
    if (isBackgroundColor) return 'Text'
    else return 'Background'
  }

  const saveColors = () => {
    console.log('>>> savedTextColor',
      toColor(savedTextColor).replace(/[^,]+(?=\))/, String((savedTextOpacity).toFixed(2))));

    console.log('>>> savedBackgroundColor',
      toColor(savedBackgroundColor).replace(/[^,]+(?=\))/, String((savedBackgroundOpacity).toFixed(2))));

  }

  let color: string | number = '000';
  if (pickedColor.value) color = toColor(pickedColor.value);

  console.log(isBackgroundColor, range, savedTextColor);

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
            style={[{ fontSize: 20, fontWeight: 'bold' }, getTextStyle()]} >Opacity: {(range).toFixed(2)}
          </Animated.Text>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={`#${color}`}
            thumbTintColor={`#${color}`}
            maximumTrackTintColor="#fff"
            value={1}
            onSlidingStart={() => setSliding('Sliding')}
            onValueChange={value => setRange(value)}
            onSlidingComplete={() => setSliding('Inactive')}
          />
        </View>

        <View style={styles.button} >
          <Button
            title={getColorButtonName()}
            onPress={() => setIsBackgroundColor(prev => !prev)}
          />
        </View>

        <Animated.View style={[{
          height: 500,
          width: 250,
        }, isBackgroundColor && { opacity: range },
        getBackgroundStyle(),
        savedBackgroundColor && { backgroundColor: savedBackgroundColor }
        ]}
        >
          <Animated.Text
            style={[
              defaultStyles.text,
              !isBackgroundColor ? { opacity: range } : {},
              getTextStyle(),
              savedTextColor ? { color: savedTextColor } : {}
            ]} >Hello
          </Animated.Text>
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