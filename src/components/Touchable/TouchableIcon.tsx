import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function TouchableIcon({
  onPress,
  renderIcon,
}: {
  onPress?: () => void;
  renderIcon: () => React.ReactNode;
}) {
  return (
    <TouchableOpacity
      style={styles.buttonIcon}
      onPress={onPress}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {
    marginRight: 11,
  },
});
