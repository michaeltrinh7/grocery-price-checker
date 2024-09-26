import React from 'react';
import { StyleSheet, Text, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { DataItem, GroceryItem } from '../types/DataItem';

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

export interface GroceryDataRow extends DataItem {
  when: string;
  message: string;
}

export default function GroceryItemRow({ item }: { item: GroceryItem }) {
  return (
    <RectButton
      style={styles.rectButton}
      onPress={() => window.alert(item.name)}
      testID='button'
    >
      <Text style={styles.fromText}>{item.name}</Text>
      <Text
        numberOfLines={2}
        style={styles.messageText}
      >
        {item.message}
      </Text>
      <Text style={styles.dateText}>{item.when} ❭</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});
