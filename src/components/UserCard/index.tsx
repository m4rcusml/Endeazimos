import { Image, TouchableOpacity } from 'react-native';
import { UserType } from '@contexts/auth';

import { Container, MiddleContainer } from './styles';
import { Typography } from '@components/Typography';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  data?: UserType;
}

export function UserCard({ data }: Props) {
  return (
    <Container>
      <Image
        source={{ uri: data?.picture }}
        width={64}
        height={64}
        borderRadius={64}
      />
      <MiddleContainer>
        <Typography weight={600} size={18}>
          {data?.name}
        </Typography>
        <Typography size={14} color='#fff9'>
          {data?.email}
        </Typography>
      </MiddleContainer>

      <TouchableOpacity
        style={{ alignSelf: 'flex-start' }}
        onPress={() => console.log('Editar perfil')}
        children={(
          <FontAwesome5
            color='white'
            name='edit'
            size={20}
          />
        )}
      />
    </Container>
  )
}