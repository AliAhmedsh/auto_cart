import { useSafeAreaInsets } from 'react-native-safe-area-context';

const top = useSafeAreaInsets().top;
const bottom = useSafeAreaInsets().bottom;
const left = useSafeAreaInsets().left;
const right = useSafeAreaInsets().right;

export const insets = { top, bottom, left, right };
export const useInsets = () => {
  return useSafeAreaInsets();
};