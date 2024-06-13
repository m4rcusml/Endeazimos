import { Image, TouchableOpacity, View } from 'react-native';
import { UserType } from '@contexts/auth';

import { Container } from './styles';
import { Typography } from '@components/Typography';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  data?: UserType;
  onPress?(): void;
}

export function UserCard({ data, onPress }: Props) {
  return (
    <Container>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Image
          source={{ uri: data?.picture }}
          style={{ backgroundColor: '#666' }}
          width={96}
          height={96}
          borderRadius={96}
        />
        <View
          children={(
            <FontAwesome5
              style={{ alignSelf: 'flex-start', position: 'absolute', bottom: 0, right: 0 }}
              color='white'
              name='edit'
              size={18}
            />
          )}
        />
      </TouchableOpacity>

      <Typography weight={600} size={18}>
        {data?.name}
      </Typography>
      <Typography size={14} color='#fff9'>
        {data?.email}
      </Typography>
    </Container>
  )
}