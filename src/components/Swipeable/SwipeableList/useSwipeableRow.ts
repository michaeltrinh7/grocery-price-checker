import { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

export const useSwipeableRow = () => {
  const currentlyOpenRow = useRef<Swipeable | null>(null);

  // Close the previous row when a new row is swiped
  const handleSwipeOpen = (swipeableRef: Swipeable | null) => {
    if (currentlyOpenRow.current && currentlyOpenRow.current !== swipeableRef) {
      currentlyOpenRow.current.close(); // Close the previously opened row
    }
    currentlyOpenRow.current = swipeableRef; // Set the new open row
  };

  return { handleSwipeOpen };
};
