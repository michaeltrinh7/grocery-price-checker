import React, { useEffect, useState } from 'react';
import { NavigationProps, ScreenName } from '../ScreenInfo';
import SwipeableList from '../components/Swipeable/SwipeableList';
import GroceryItemRow, { GroceryDataRow } from './GroceryItemRow';
import { SortCompareFn } from '../types/DataItem';

export default function GroceryItemList({
  navigation,
  route,
}: NavigationProps<ScreenName.GroceryItemList>) {
  const [data, setData] = useState(DATA);
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

const DATA: GroceryDataRow[] = [
  {
    id: 1,
    name: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    id: 2,
    name: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    id: 3,
    name: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    id: 4,
    name: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    id: 5,
    name: 'Domestos',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    id: 6,
    name: 'Cardinal Richelieu',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    id: 7,
    name: "D'Artagnan",
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    id: 8,
    name: 'Cardinal Richelieu',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
  {
    id: 11,
    name: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    id: 12,
    name: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    id: 13,
    name: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    id: 14,
    name: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    id: 15,
    name: 'Domestos',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    id: 16,
    name: 'Cardinal Richelieu',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    id: 17,
    name: "D'Artagnan",
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    id: 18,
    name: 'Cardinal Richelieu',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];
