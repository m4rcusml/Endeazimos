import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@contexts/auth';

import Logo from '@assets/logo.svg';
import { UserCard } from '@components/UserCard';
import { Typography } from '@components/Typography';
import { Buildings, CaretRight, HandHeart } from 'phosphor-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export function CadastroExpandido() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const { user } = useAuth();

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <Logo
        width={200}
        height={200}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '52%',
          opacity: 0.5,
          transform: [
            { translateX: -100 },
            { translateY: -100 }
          ]
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <UserCard data={user} />
      </View>

      <View style={styles.contentCard}>
        <TouchableOpacity style={styles.buttonBox} activeOpacity={0.6} onPress={() => navigate('instituicao')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <Buildings />
            <Typography color='black'>Instituição</Typography>
          </View>
          <CaretRight />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBox} activeOpacity={0.6} onPress={() => navigate('contribuinte')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <HandHeart />
            <Typography color='black'>Contribuintes</Typography>
          </View>
          <CaretRight />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contentCard: {
    gap: 10,
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});