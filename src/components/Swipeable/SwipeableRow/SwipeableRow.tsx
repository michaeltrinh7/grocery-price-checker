import React, { useRef } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DataItem } from '../../../types/DataItem';
import { useHandleDelete } from './useHandleDelete';
import { useRenderRightActions } from './useRenderRightActions';

interface SwipeableRowProps<TDataItem extends DataItem> {
  item: TDataItem;
  onEdit: (item: TDataItem) => void;
  onDelete: () => void;
  onSwipeOpen: (swipeableRowRef: Swipeable | null) => void;
  renderRowItem: (data: TDataItem) => React.ReactNode;
  rowItemHeight: number;
}

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

  const handleDelete = useHandleDelete(itemHeight, opacity, onDelete);

  return (
    <Swipeable
      key={`Swipeable {item.id}`}
      ref={swipeableRowRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={(progress) =>
        useRenderRightActions(
          progress,
          () => {
            swipeableRowRef.current?.close();
            onEdit(item);
          },
          () => {
            swipeableRowRef.current?.close();
            handleDelete();
          }
        )
      }
      onSwipeableWillOpen={() => onSwipeOpen(swipeableRowRef.current)}
      testID='swipeable-row'
    >
      <Animated.View
        style={[styles.rowContainer, rowContainerStyle]}
        key={`SwipeableItem {item.id}`}
      >
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
  rightActionView: {
    flex: 1,
  },
  rightActionsView: {
    width: 192,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  rowContainer: {
    width: '100%',
  },
});
