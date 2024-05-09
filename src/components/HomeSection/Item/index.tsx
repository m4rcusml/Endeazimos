import { Image } from 'react-native';
import { ItemContainer } from '../styles';
import { Typography } from '@components/Typography';

export type HomeSectionItemProps = {
  name: string;
  image: string;
}

export function Item({ name, image }: HomeSectionItemProps) {
  return (
    <ItemContainer>
      <Image
        source={{ uri: image}}
        width={120}
        height={120}
        borderRadius={10}
        resizeMode='cover'
      />
      <Typography

      >
        {name}
      </Typography>
    </ItemContainer>
  )
}