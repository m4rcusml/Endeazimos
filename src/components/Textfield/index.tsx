import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { Container, Input } from './styles';
import { Feather } from '@expo/vector-icons';
import { TextInputProps, TouchableOpacity } from 'react-native';

type Props = TextInputProps & {
  placeholder?: string;
  filled?: boolean;
  name?: string;
  control?: any;
  isPasswordField?: boolean;
}

export function Textfield({ filled = false, control, name = '', isPasswordField = false, ...rest }: Props) {
  const [showPassword, setShowPassoword] = useState(false);

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
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={isPasswordField ? !showPassword : undefined}
            {...rest}
          />
        )}
        name={name}
      />
      {
        isPasswordField
        && (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setShowPassoword(prev => !prev)}
            style={{ alignSelf: 'center' }}
            children={(
              <Feather
                size={22}
                name={showPassword ? 'eye' : 'eye-off'}
                color='white'
              />
            )}
          />
        )
      }
    </Container>
  )
}