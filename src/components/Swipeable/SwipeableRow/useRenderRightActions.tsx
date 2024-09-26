import React from 'react';
import { I18nManager, View } from 'react-native';
import { Animated as RNAnimated } from 'react-native';
import { useRenderRightAction } from './useRenderRightAction';

export const useRenderRightActions = (
  progress: RNAnimated.AnimatedInterpolation<number>,
  onEdit: () => void,
  onDelete: () => void
) => (
  <View
    testID='right-actions-container'
    style={{
      width: 192,
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    }}
  >
    {useRenderRightAction('Edit', '#ffab00', 64, progress, onEdit)}
    {useRenderRightAction('Delete', '#dd2c00', 64, progress, onDelete)}
  </View>
);
