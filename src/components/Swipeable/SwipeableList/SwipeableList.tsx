import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SwipeableRow from '../SwipeableRow/SwipeableRow';
import SwipeableListHeader from '../SwipeableListHeader';
import { DataItem } from '../../../types/DataItem';
import { useSwipeableRow } from './useSwipeableRow';

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
  items: TDataItem[] | undefined;
  renderRowItem: (data: TDataItem) => React.ReactNode;
  rowItemHeight: number;
}) {
  const { handleSwipeOpen } = useSwipeableRow();

  return (
    <FlatList
      data={items}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      ListHeaderComponent={
        <SwipeableListHeader
          testID='FlatList.ListHeaderComponent'
          onChangeFilter={handleFilterChange}
          key={'FlatList.ListHeaderComponent'}
        />
      }
      ItemSeparatorComponent={Separator}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={8}
      renderItem={({ item }) => (
        <SwipeableRow
          key={`SwipeableRow ${item.id}`}
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
      keyExtractor={(_item) => `SwipeableRow ${_item.id}`}
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
