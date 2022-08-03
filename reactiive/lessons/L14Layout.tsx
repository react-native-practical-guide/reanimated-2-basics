import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798de'
interface Item {
  id: number;
}
const intitalItems: Item[] = new Array(3).fill(0).map((_, i) => ({ id: i }));

// TODO: 
/* Check: 
- what is: condition ?? 0 
The JavaScript double question mark is also known as the nullish coalescing operator. It's an operator that simply returns the right-side expression when the left side expression is either null or undefined .

- entering={FadeIn} 
- entering={ZoomIn} 
https://docs.swmansion.com/react-native-reanimated/docs/api/LayoutAnimations/entryAnimations/
*/
export default function L14Layout() {
  const initialMode = useRef<boolean>(true);

  const [items, setItems] = useState<Item[]>(intitalItems);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const onAdd = useCallback(
    () => {
      setItems(currentItems => {
        const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;

        return [...currentItems, { id: nextItemId }]
      });
    }, [items]);

  const onDelete = (itemId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId))
  }

  return (
    <View style={styles.container} >
      <View style={{ height: 120 }}>
        <TouchableOpacity onPress={onAdd} style={styles.floatingButton} >
          <Text style={{ color: 'white', fontSize: 40 }} >+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView  >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
              exiting={FadeOut}
              onTouchEnd={() => onDelete(item.id)}
              layout={Layout.delay(200)}
              style={styles.listItem} />
          )
        })}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  floatingButton: {
    width: 80,
    height: 80,
    aspectRatio: 1, // just keep the height equal to the width.
    backgroundColor: 'black',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 20
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: .15,
    shadowOffset: { width: 0, height: 10 }

  }
})