import React, { useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import SwipeableRow from './SwipeableRow';
import SwipeableListHeader from './SwipeableListHeader';
import { DataItem } from '../../types/DataItem';

export default function SwipeableList<TDataItem extends DataItem>({
  handleItemEdit,
  handleItemDelete,
  handleFilterChange,
  items,
  renderRowItem,
  rowItemHeight,
}: {
  handleItemEdit: (item: TDataItem) => void;
  handleItemDelete: (id: number) => void;
  handleFilterChange: (text: string) => void;
  items: TDataItem[];
  renderRowItem: (data: TDataItem) => React.ReactNode;
  rowItemHeight: number;
}) {
  const currentlyOpenRow = useRef<SwipeableMethods | null>(null); // Track the currently open swipeable row

  // Close the previous row when a new row is swiped
  const handleSwipeOpen = (swipeableRef: SwipeableMethods | null) => {
    if (currentlyOpenRow.current && currentlyOpenRow.current !== swipeableRef) {
      currentlyOpenRow.current.close(); // Close the previously opened row
    }
    currentlyOpenRow.current = swipeableRef; // Set the new open row
  };

  return (
    <FlatList
      data={items}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      ListHeaderComponent={
        <SwipeableListHeader onChangeFilter={handleFilterChange} />
      }
      ItemSeparatorComponent={Separator}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={8}
      renderItem={({ item }) => (
        <SwipeableRow
          item={item}
          onEdit={() => {
            handleItemEdit(item);
          }}
          onDelete={() => {
            handleItemDelete(item.id);
          }}
          onSwipeOpen={handleSwipeOpen}
          renderRowItem={renderRowItem}
          rowItemHeight={rowItemHeight}
        />
      )}
      keyExtractor={(_item) => `${_item.id}`}
    />
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
});
