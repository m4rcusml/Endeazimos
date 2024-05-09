import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackRoutesParams } from '@routes/app.routes';

import MapView, { Marker } from 'react-native-maps';
import { Typography } from '@components/Typography';
import { GenericButton } from '@components/GenericButton';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export function Instituicao() {
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

        <Typography alignment='justify'>
          {data.description}
        </Typography>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location.latitude,
              longitude: data.location.longitude
            }}
          />
        </MapView>

        <View style={styles.actionsContainer}>
          <GenericButton
            filled
            icon={() => <FontAwesome name='whatsapp' size={30} color='#189d0e' />}
          />
          <GenericButton
            filled
            onPress={openVoluntariado}
            icon={() => <FontAwesome name='group' size={24} color='black' />}
          />
          <GenericButton
            filled
            icon={() => <FontAwesome6 name='pix' size={24} color='#00bdae' />}
          />
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
    gap: 40,
  },
  map: {
    width: '100%',
    height: 200,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});