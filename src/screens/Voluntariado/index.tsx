import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackRoutesParams } from '@routes/app.routes';

import { Typography } from '@components/Typography';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export function Voluntariado() {
  const route = useRoute<RouteProp<StackRoutesParams, 'instituicao'>>();
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();
  const { top } = useSafeAreaInsets();
  const { data } = route.params;

  function openVoluntariado() {
    navigate('voluntariado', { data });
  }

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <FontAwesome
          size={64}
          name='group'
          color='black'
          style={{ alignSelf: 'center', marginTop: -65 }}
        />
        
        <Typography size={30} weight={600}>
          Voluntariar-se a:
        </Typography>

        <Image
          source={{ uri: data.image }}
          style={{ alignSelf: 'center', width: '100%', overflow: 'hidden' }}
          resizeMode='contain'
          borderRadius={20}
          height={200}
        />

        <Typography
          size={24}
          weight={800}
          alignment='center'
        >
          {data.name}
        </Typography>

        <View style={styles.infoContainer}>
          <Typography style={{ flex: 1 }} color='black'>
            Vagas disponíveis: 
          </Typography>

          <Typography style={{ flex: 1 }} color='black' size={14} alignment='center'>
            Máximo atingido
          </Typography>
        </View>

        <View style={styles.infoContainer}>
          <Typography style={{ flex: 1 }} color='black'>
            Documentos necessários: 
          </Typography>

          <Typography style={{ flex: 1 }} color='black' size={14} alignment='center'>
            {/* alguma coisa */}
          </Typography>
        </View>

        <View style={styles.infoContainer}>
          <Typography style={{ flex: 1 }} color='black'>
            Contate em: 
          </Typography>

          <View style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <FontAwesome name='whatsapp' size={24} color='#189d0e' />

            <Typography color='black'>
              (92) 99999-9999
            </Typography>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 32,
    paddingBottom: 100,
    paddingTop: 80,
    gap: 30,
  },
  infoContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    gap: 5
  }
});