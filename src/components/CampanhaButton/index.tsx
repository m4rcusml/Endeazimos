import { Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutesParams } from '@routes/app.routes';

import { Container, InfoContainer } from './styles';
import { Typography } from '@components/Typography';
import { ProgressBar } from '@components/ProgressBar';
import { CaretRight } from 'phosphor-react-native';

export type CampanhaProps = {
  id: string;
  name: string;
  description: string;
  requiredValue: number;
  collected: number;
  image: string;
}

type Props = {
  data: CampanhaProps;
}

export function CampanhaButton({ data }: Props) {
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();

  function openDetails() {
    navigate('campanhaDetails', { data });
  }

  return (
    <Container onPress={openDetails}>
      <Image
        source={data.image ? { uri: data.image } : undefined}
        width={120}
        height={120}
        borderRadius={10}
        resizeMode='cover'
      />

      <InfoContainer>
        <Typography color='black' weight={500} size={18}>
          {data.name}
        </Typography>

        <Typography color='#0008' size={14}>
          Total arrecadado: {((data.collected / data.requiredValue) * 100).toFixed(0)}%
        </Typography>

        <ProgressBar total={data.requiredValue} value={data.collected} />
      </InfoContainer>

      <CaretRight
        color='white'
        size={24}
        style={{
          backgroundColor: '#0005',
          borderRadius: 30,
          padding: 10
        }}
      />
    </Container>
  )
}