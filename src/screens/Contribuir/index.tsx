import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackRoutesParams } from '@routes/app.routes';

import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

import { Typography } from '@components/Typography';
import { GenericButton } from '@components/GenericButton';
import { Cards, CreditCard } from 'phosphor-react-native';

export function Contribuir() {
  const { top } = useSafeAreaInsets();
  const route = useRoute<RouteProp<StackRoutesParams, 'campanhaDetails'>>();
  const { data } = route.params;

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top + 50 }]}
    >
      <Typography
        size={24}
        weight={800}
        alignment='center'
      >
        Contribuir
      </Typography>

      <Typography alignment='center' size={18} weight={600}>
        Saiba que, ao doar, você muda a vida de uma pessoa necessitada
        e torna o mundo, aos poucos, um lugar melhor.
      </Typography>

      <TextInput style={styles.input} placeholder='Valor (R$ 10,00)' />

      <View style={styles.requiredValue}>
        <GenericButton
          filled
          icon={() => <FontAwesome6 name='pix' size={24} color='#00bdae' />}
        />
        <GenericButton
          filled
          icon={() => <CreditCard color='#e0a82f' />}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 80,
    gap: 80,
    justifyContent: 'space-around'
  },
  requiredValue: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16
  }
});