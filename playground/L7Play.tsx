import React, { useCallback, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPickerPlay from '../components/ColorPickerPlay';
import COLORS from '../constants/colors';
import { l7styles } from '../lessons/L7ColorPicker';
import defaultStyles, { height, width } from '../styles/defaultStyles';


const PICKER_HEIGHT = height * 0.8;

const L7Play = () => {
  const [backgroundColor, setBackgroundColor] = useState<boolean>(false)
  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const onColorChanged = useCallback((color: string | number) => {
    'worklet'
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    if (backgroundColor)
      return { backgroundColor: pickedColor.value }
    else
      return { color: pickedColor.value }
  });

  const getTextStyle = () => {
    if (!backgroundColor) return rStyle
  }
  const getBackgroundStyle = () => {
    if (backgroundColor) return rStyle
  }

  const getButtonName = () => {
    if (backgroundColor) return 'Text'
    else return 'Background'
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sample, getBackgroundStyle()]} >
        <View style={{ position: 'absolute', top: -80 }} >
          <Button
            title={getButtonName()}
            onPress={() => setBackgroundColor(prev => !prev)}
          />
        </View>
        <Animated.Text
          style={[defaultStyles.text, getTextStyle()]} >Hello
        </Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.gradientContainer]} >
        <ColorPickerPlay
          colors={COLORS}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxHeight={PICKER_HEIGHT}
          onColorChange={onColorChanged}
        />
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedede',
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
    backgroundColor: '#dedede'
  },
  sample: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    height: 500,
    width: 250,
    borderWidth: 1,
    borderColor: '#000',
  },
})

export default L7Play