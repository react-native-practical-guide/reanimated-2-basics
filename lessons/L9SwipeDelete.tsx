import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import { TITLES } from '../constants/titles';

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));
const BACKGROUND_COLOR = '#FAFBFF';

export default function L9SwipeDelete() {
  const [tasks, setTtasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTtasks((tasks => tasks.filter(item => item.index !== task.index)))
  }, [])

  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar style='auto' />
      <Text style={styles.title} >Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1, }} >
        {tasks.map((task) =>
          <ListItem
            key={task.index}
            task={task}
            onDismiss={onDismiss}
            simultaneousHandlers={scrollRef}
          />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%'
  }
})