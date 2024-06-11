import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@contexts/auth';

import Logo from '@assets/logo.svg';
import { UserCard } from '@components/UserCard';
import { GenericButton } from '@components/GenericButton';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Typography } from '@components/Typography';
import { CaretRight, HandHeart, Lock, UserPlus } from 'phosphor-react-native';

const RedirectButton = ({ title, icon, onPress }: { title: string, icon(): void, onPress(): void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
    style={styles.buttonBox}
    children={(
      <>
        {icon && icon()}
        <Typography size={18}>{title}</Typography>
        <CaretRight
          color='white'
          size={20}
        />
      </>
    )}
  />
)

export function Profile() {
  const { top } = useSafeAreaInsets();
  const { user, logOut } = useAuth();

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <Logo
        width={240}
        height={240}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          opacity: 0.5,
          transform: [
            { translateX: -120 },
            { translateY: -120 }
          ]
        }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <UserCard data={user} />

        <View style={styles.buttonsContainer}>
          <RedirectButton
            onPress={() => {}}
            icon={() => <UserPlus color='white' />}
            title='Expansão de cadastro'
          />
          <RedirectButton
            onPress={() => {}}
            icon={() => <Lock color='white' />}
            title='Alterar senha'
          />
          <RedirectButton
            onPress={() => {}}
            icon={() => <HandHeart color='white' />}
            title='Doações'
          />
        </View>

        <GenericButton
          icon={() => <MaterialIcons name='logout' size={24} color='black' />}
          style={styles.logOut}
          onPress={logOut}
          title='Sair'
          filled
        />
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    gap: 60,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    marginHorizontal: 20,
    gap: 15
  },
  logOut: {
    alignSelf: 'flex-start'
  },
  buttonBox: {
    backgroundColor: '#fff6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caretStyle: {
    backgroundColor: '#fff5',
    borderRadius: 30,
    paddingVertical: 5,
    paddingLeft: 6,
    paddingRight: 4
  }
});