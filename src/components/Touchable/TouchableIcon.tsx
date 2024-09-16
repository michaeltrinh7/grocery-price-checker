import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TouchableIcon({
  iconName,
  onPress,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconName: any;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.buttonIcon}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={32}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {
    marginRight: 11,
  },
});
