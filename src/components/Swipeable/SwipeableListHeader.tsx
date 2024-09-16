import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export default function SwipeableListHeader({
  onChangeFilter,
}: {
  onChangeFilter: (text: string) => void;
}) {
  const [filter, setFilter] = useState('');

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        marginVertical: 5,
        borderRadius: 10,
      }}
    >
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
        value={filter}
        onChangeText={(text) => {
          setFilter(text);
          onChangeFilter(text);
        }}
        placeholder='Filter grocery items'
        style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
      />
    </View>
  );
}
