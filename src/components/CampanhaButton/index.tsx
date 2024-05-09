import { Image } from 'react-native';
import { Container, InfoContainer } from './styles';
import { Typography } from '@components/Typography';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from '@components/ProgressBar';

type Props = {
  name: string;
  totalRaised: number;
  image: string;
}

export function CampanhaButton({ name, image, totalRaised }: Props) {
  return (
    <Container>
      <Image
        source={image ? { uri: image } : undefined}
        width={120}
        height={120}
        borderRadius={10}
        resizeMode='cover'
      />

      <InfoContainer>
        <Typography color='black' weight={500} size={18}>
          {name}
        </Typography>

        <Typography color='#0008' size={14}>
          Total arrecadado: {totalRaised}%
        </Typography>

        <ProgressBar progress={totalRaised} />
      </InfoContainer>

      <AntDesign
        name='right'
        color='white'
        size={24}
        style={{
          backgroundColor: '#0005',
          borderRadius: 30,
          paddingVertical: 5,
          paddingLeft: 6,
          paddingRight: 4
        }}
      />
    </Container>
  )
}