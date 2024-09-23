import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  I18nManager,
  Animated as RNAnimated,
} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DataItem } from '../../types/DataItem';

interface SwipeableRowProps<TDataItem extends DataItem> {
  item: TDataItem;
  onEdit: (item: TDataItem) => void;
  onDelete: () => void;
  onSwipeOpen: (swipeableRowRef: Swipeable | null) => void;
  renderRowItem: (data: TDataItem) => React.ReactNode;
  rowItemHeight: number;
}

const renderRightAction = (
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
  const pressHandler = () => {
    onPress();
  };

  return (
    <RNAnimated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}
      >
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </RNAnimated.View>
  );
};
const renderRightActions = (
  progress: RNAnimated.AnimatedInterpolation<number>,
  _dragAnimatedValue: RNAnimated.AnimatedInterpolation<number>,
  onEdit: () => void,
  onDelete: () => void
) => (
  <View
    style={{
      width: 192,
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    }}
  >
    {renderRightAction('Edit', '#ffab00', 64, progress, onEdit)}
    {renderRightAction('Delete', '#dd2c00', 64, progress, onDelete)}
  </View>
);

export default function SwipeableRow<TDataItem extends DataItem>({
  item,
  onEdit,
  onDelete,
  onSwipeOpen,
  renderRowItem,
  rowItemHeight = 70,
}: SwipeableRowProps<TDataItem>) {
  const swipeableRowRef = useRef<Swipeable>(null);

  const itemHeight = useSharedValue(rowItemHeight);
  const opacity = useSharedValue(1);

  const rowContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: opacity.value,
    };
  });

  const handleDelete = () => {
    itemHeight.value = withTiming(0);
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        runOnJS(onDelete)();
      }
    });
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={(progress, dragAnimatedValue) =>
        renderRightActions(
          progress,
          dragAnimatedValue,
          () => onEdit(item),
          handleDelete
        )
      }
      onSwipeableWillOpen={() => onSwipeOpen(swipeableRowRef.current)}
      testID='swipeable-row'
    >
      <Animated.View style={[styles.rowContainer, rowContainerStyle]}>
        {renderRowItem(item)}
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  archiveText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 20,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 'auto',
  },
  rightActionView: {
    flex: 1,
  },
  rightActionsView: {
    width: 192,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    width: '100%',
  },
});
