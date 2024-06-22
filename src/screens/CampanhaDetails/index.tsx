import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StackRoutesParams } from '@routes/app.routes';

import { Typography } from '@components/Typography';
import { ProgressBar } from '@components/ProgressBar';

export function CampanhaDetails() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationProp<StackRoutesParams>>();
  const route = useRoute<RouteProp<StackRoutesParams, 'campanhaDetails'>>();
  const { data } = route.params;

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

        <View style={styles.requiredValue}>
          <Typography>
            R$ {data.collected.toFixed(2).replace('.', ',')} arrecadados no momento
          </Typography>

          <ProgressBar total={data.requiredValue} value={data.collected} />

          <Typography>
            Meta: R$ {data.requiredValue.toFixed(2).replace('.', ',')}
          </Typography>
        </View>


        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.doarButton}
          onPress={() => navigate('contribuir', { data })}
          children={(
            <Typography weight={600}>
              Contribuir
            </Typography>
          )}
        />

        <Typography alignment='justify'>
          {data.description}
        </Typography>
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
  requiredValue: {
    gap: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    marginHorizontal: -16
  },
  doarButton: {
    alignSelf: 'center',
    backgroundColor: '#0d4b81',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 3,
  }
});