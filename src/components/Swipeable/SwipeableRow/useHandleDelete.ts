import {
    runOnJS,
    SharedValue,
    withTiming,
  } from 'react-native-reanimated';

export const useHandleDelete = (
    itemHeight: SharedValue<number>,
    opacity: SharedValue<number>,
    onDelete: () => void
  ) => {
    const handleDelete = () => {
      itemHeight.value = withTiming(0);
      opacity.value = withTiming(0, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(onDelete)();
        }
      });
    };
  
    return handleDelete;
  };
  