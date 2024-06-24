import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackRoutesParams } from '@routes/app.routes';

import firestore from '@react-native-firebase/firestore';

import { Container, InfoContainer } from './styles';
import { Typography } from '@components/Typography';
import { ProgressBar } from '@components/ProgressBar';
import { CaretRight } from 'phosphor-react-native';
import { useEffect, useState } from 'react';

export type CampanhaProps = {
  id: string;
  name: string;
  description: string;
  requiredValue: number;
  collected: number;
  image: string;
}

type Props = {
  data?: CampanhaProps;
  id: string;
}

export function CampanhaButton({ id }: Props) {
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();
  const [campanha, setCampanha] = useState<CampanhaProps>();

  useEffect(() => {
    const unsubscribe = firestore().collection('campanha').doc(id).onSnapshot(querySnapshot => {
      setCampanha(querySnapshot.data() as CampanhaProps);
    });

    return () => unsubscribe();
  }, []);

  if(!campanha) {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <ActivityIndicator size='large' color='black' />
        <View style={styles.footer} />
      </View>
    )
  }
  
  return (
    <Container onPress={() => navigate('campanhaDetails', { data: campanha })}>
      <Image
        source={{ uri: campanha?.image || undefined }}
        width={120}
        height={120}
        borderRadius={10}
        resizeMode='cover'
      />

      <InfoContainer>
        <Typography color='black' weight={500} size={18}>
          {campanha?.name}
        </Typography>

        <Typography color='#0008' size={14}>
          Total arrecadado: {((campanha.collected / campanha.requiredValue) * 100).toFixed(0)}%
        </Typography>

        <ProgressBar total={campanha.requiredValue} value={campanha.collected} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15
  },
  header: {
    padding: 10,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  footer: {
    padding: 10,
    gap: 10,
    flexDirection: 'row'
  }
});