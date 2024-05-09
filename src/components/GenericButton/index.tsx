import { TouchableOpacityProps, ViewStyle } from 'react-native';
import { Container } from './styles';
import { Typography } from '@components/Typography';

type Props = TouchableOpacityProps & {
  title?: string;
  filled?: boolean;
  onPress?(): void;
  icon?(): React.ReactNode;
  style?: ViewStyle;
}

export function GenericButton({ title, icon, filled, onPress, style, ...rest }: Props) {
  return (
    <Container filled={filled} onPress={onPress} style={style} {...rest}>
      {icon && icon()}
      {
        title
        && <Typography
          color={filled ? 'black' : 'white'}
          size={18}
        >
          {title}
        </Typography>
      }
    </Container>
  )
}