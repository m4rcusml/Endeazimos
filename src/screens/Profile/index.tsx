import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '@contexts/auth';

import { CaretRight, HandHeart, Lock, UserPlus, SignOut } from 'phosphor-react-native';
import { GenericButton } from '@components/GenericButton';
import { Typography } from '@components/Typography';
import { UserCard } from '@components/UserCard';

import Logo from '@assets/logo.svg';

const RedirectButton = ({ title, icon, onPress }: { title: string, icon(props?: any): void, onPress(): void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.4}
    style={styles.buttonBox}
    children={(
      <>
        {icon && icon({ size: 28 })}
        <Typography size={18} color='black' style={{ flex: 1 }}>{title}</Typography>
        <CaretRight size={20} />
      </>
    )}
  />
)

export function Profile() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<any>();
  const { user, logOut } = useAuth();

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
      <View style={{ margin: 'auto' }}>
        <UserCard data={user} onPress={() => navigate('editProfile')} />
      </View>

      <View style={styles.contentCard}>
        <ScrollView contentContainerStyle={{ paddingVertical: 30, gap: 30 }}>
          <View style={styles.buttonsContainer}>
            <RedirectButton
              onPress={() => navigate('cadastroExpandido')}
              icon={(props) => <UserPlus {...props} />}
              title='Expansão de cadastro'
            />
            <RedirectButton
              onPress={() => navigate('alterarSenha')}
              icon={(props) => <Lock {...props} />}
              title='Alterar senha'
            />
            <RedirectButton
              onPress={() => { }}
              icon={(props) => <HandHeart {...props} />}
              title='Doações'
            />
          </View>
        </ScrollView>

        <GenericButton
          icon={() => <SignOut size={24} color='black' />}
          style={{ alignSelf: 'flex-end', margin: 16 }}
          onPress={logOut}
          title='Sair'
          filled
        />
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
    backgroundColor: '#dfdfdf',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexBasis: '55%',
    minHeight: '25%',
    flexShrink: 1,
  },
  buttonsContainer: {
    marginHorizontal: 20,
    gap: 15
  },
  buttonBox: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 40,
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});