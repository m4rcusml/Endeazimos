import { Controller } from 'react-hook-form';
import { Container, Input } from './styles';

type Props = {
  filled?: boolean;
  placeholder?: string;
  name?: string;
  control?: any;
}

export function Textfield({ filled = false, control, name = '', ...rest }: Props) {

  if (!control) {
    return (
      <Container filled={filled}>
        <Input {...rest} />
      </Container>
    )
  }

  return (
    <Container filled={filled}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
    </Container>
  )
}