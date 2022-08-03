import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import SlidingCounter from '../components/SlidingCounter';


export default function L12SlidingCounter() {

  return (
    <View style={styles.container} >
      <SlidingCounter />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
})