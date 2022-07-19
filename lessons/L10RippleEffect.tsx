import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ripple from '../components/Ripple';
import defaultStyles from '../styles/defaultStyles';

export default function L10RippleEffect() {


  return (
    <View style={defaultStyles.container}>
      <Ripple style={styles.ripple}
        onTap={() => {
          console.log('tap');
        }}
      >
        <Text style={{ fontSize: 25 }} >Tap</Text>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  ripple: {
    width: 200,
    height: 200,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})