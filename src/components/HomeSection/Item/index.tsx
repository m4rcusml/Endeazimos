import { Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutesParams } from '@routes/app.routes';

import { ItemContainer } from '../styles';
import { Typography } from '@components/Typography';

export type InstituicaoProps = {
  name: string;
  image: string;
  description: string;
  namedAddress: string;
  openingHours: string;
  telephone: string;
  location: {
    latitude: number,
    longitude: number
  }
}

type HomeSectionItemProps = {
  data: InstituicaoProps;
}

export function Item({ data }: HomeSectionItemProps) {
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();

  function openInstituicao() {
    navigate('instituicao', { data });
  }

  return (
    <ItemContainer onPress={openInstituicao}>
      <Image
        source={{ uri: data.image }}
        width={120}
        height={120}
        borderRadius={10}
        resizeMode='cover'
      />
      <Typography>
        {data.name}
      </Typography>
    </ItemContainer>
  )
}