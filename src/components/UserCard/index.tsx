import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Container } from './styles';
import { Typography } from '@components/Typography';
import { PencilSimple } from 'phosphor-react-native';

import { UserType, useAuth } from '../../contexts/auth';

type Props = {
  data?: UserType;
  imageUrl?: string;
  onPress?(): void;
}

export function UserCard({ data, imageUrl, onPress }: Props) {
  return (
    <Container>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Image
          source={{ uri: imageUrl || data?.photo || 'http://semfoto' }}
          style={{ backgroundColor: '#666' }}
          width={96}
          height={96}
          borderRadius={96}
        />
        {onPress && <View
          children={(
            <PencilSimple
              style={{ alignSelf: 'flex-start', position: 'absolute', bottom: 0, right: 0, backgroundColor: 'black', borderRadius: 30, padding: 10 }}
              color='white'
              size={18}
            />
          )}
        />}
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