import { Image } from 'react-native';
import { Container, InfoContainer } from './styles';
import { Typography } from '@components/Typography';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from '@components/ProgressBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutesParams } from '@routes/app.routes';

export type CampanhaProps = {
  name: string;
  description: string;
  requiredValue: number;
  totalRaised: number;
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
          Total arrecadado: {data.totalRaised}%
        </Typography>

        <ProgressBar progress={data.totalRaised} />
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