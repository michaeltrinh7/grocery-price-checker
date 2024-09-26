import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Animated as RNAnimated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const useRenderRightAction = (
  text: string,
  color: string,
  x: number,
  progress: RNAnimated.AnimatedInterpolation<number>,
  onPress: () => void
) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <RNAnimated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </RNAnimated.View>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 'auto',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
