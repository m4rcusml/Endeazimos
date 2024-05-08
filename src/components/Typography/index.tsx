import { StyleProp, TextStyle } from 'react-native';
import { StyledTextProps, Text } from './styles';

type TypographyProps = StyledTextProps & {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function Typography({ children, ...rest }: TypographyProps) {
  return (
    <Text {...rest}>
      {children}
    </Text>
  )
}