import React, { useEffect, useState } from 'react';
import { NavigationProps, ScreenName } from '../ScreenInfo';
import SwipeableList from '../components/Swipeable/SwipeableList';
import GroceryItemRow, { GroceryDataRow } from './GroceryItemRow';
import { SortCompareFn } from '../types/DataItem';

interface ListProps extends NavigationProps<ScreenName.GroceryItemList> {
  items: GroceryDataRow[];
}
export default function GroceryItemList({ navigation, route, items }: ListProps) {
  const [data, setData] = useState(items);
  const [filter, setFilter] = useState('');
  const [sortedData, setSortedData] = useState(data.sort(SortCompareFn));

  useEffect(() => {
    if (route.params?.itemName) {
      if (route.params?.itemId > 0) {
        const updatedData = data.map((item) => {
          if (item.id === route.params?.itemId) {
            return { ...item, name: route.params?.itemName };
          } else {
            return item;
          }
        });
        updateData(updatedData);
      } else {
        const itemWithMostId = data.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        });
        const updatedData = [
          ...data,
          {
            id: itemWithMostId.id + 1,
            name: route.params?.itemName,
            when: '',
            message: '',
          },
        ];

        updateData(updatedData);
      }
      navigation.setParams({
        itemId: 0,
        itemName: '',
      });
    }
  }, [route.params?.itemName]);

  const updateData = (updatedData: GroceryDataRow[]) => {
    setData(updatedData);
    const foundData = updatedData
      .filter((d) => d.name?.includes(filter))
      .sort(SortCompareFn);

    setSortedData(foundData.sort(SortCompareFn));
  };

  const handleEdit = (item: GroceryDataRow) => {
    navigation.navigate(ScreenName.GroceryItemModal, {
      itemId: item.id,
      itemName: item.name,
      screenTitle: `Edit grocery item '${item.name}'`,
    });
  };
  const handleDelete = (id: number) => {
    const updatedData = data.filter((d) => d.id !== id);
    updateData(updatedData);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    const foundData = data
      .filter((d) => d.name?.includes(filter))
      .sort(SortCompareFn);
    setSortedData(foundData);
  };

  return (
    <SwipeableList
      items={sortedData}
      handleItemEdit={handleEdit}
      handleItemDelete={handleDelete}
      handleFilterChange={handleFilterChange}
      renderRowItem={(item) => <GroceryItemRow item={item} />}
      rowItemHeight={70}
    />
  );
}
