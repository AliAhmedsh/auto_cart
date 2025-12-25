import { Platform } from 'react-native';

const font = (name: string) => (Platform.OS === 'ios' ? name : name);

export const typography = {
  regular: font('SourceSans3-Regular'),
  medium: font('SourceSans3-Medium'),
  semiBold: font('SourceSans3-SemiBold'),
  bold: font('SourceSans3-Bold'),
  black: font('SourceSans3-Black'),
  light: font('SourceSans3-Light'),
  italic: font('SourceSans3-Italic'),
};
