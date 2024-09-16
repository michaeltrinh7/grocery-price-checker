import React, { useRef } from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { DataItem } from '../../types/DataItem';

interface SwipeableRowProps<TDataItem extends DataItem> {
  item: TDataItem;
  onEdit: (item: TDataItem) => void;
  onDelete: () => void;
  onSwipeOpen: (swipeableRowRef: SwipeableMethods | null) => void;
  renderRowItem: (data: TDataItem) => React.ReactNode;
  rowItemHeight: number;
}

interface RightActionProps {
  text: string;
  color: string;
  x: number;
  progress: SharedValue<number>;
  totalWidth: number;
  swipeableRef: React.RefObject<SwipeableMethods>;
}

const RightAction = ({
  text,
  color,
  x,
  progress,
  totalWidth,
  swipeableRef,
  onPress,
}: RightActionProps & { onPress: () => void }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, -totalWidth], [x, 0]),
      },
    ],
  }));
  const pressHandler = () => {
    swipeableRef.current?.close();
    onPress();
  };

  return (
    <Animated.View style={[styles.rightActionView, animatedStyle]}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}
      >
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const renderRightActions = (
  _: SharedValue<number>,
  progress: SharedValue<number>,
  swipeableRef: React.RefObject<SwipeableMethods>,
  onEdit: () => void,
  onDelete: () => void
) => (
  <View style={styles.rightActionsView}>
    <RightAction
      text='Edit'
      color='#ffab00'
      x={64}
      progress={progress}
      totalWidth={192}
      swipeableRef={swipeableRef}
      onPress={onEdit}
    />
    <RightAction
      text='Delete'
      color='#dd2c00'
      x={64}
      progress={progress}
      totalWidth={192}
      swipeableRef={swipeableRef}
      onPress={onDelete}
    />
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
  const swipeableRowRef = useRef<SwipeableMethods>(null);

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
      renderRightActions={(_, progress) =>
        renderRightActions(
          _,
          progress,
          swipeableRowRef,
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
