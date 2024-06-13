import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@contexts/auth';

import Logo from '@assets/logo.svg';
import { UserCard } from '@components/UserCard';
import { Typography } from '@components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function EditProfile() {
  const { top } = useSafeAreaInsets();
  const { user, editProfile } = useAuth();
  const { goBack } = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
          top: '52%',
          opacity: 0.5,
          transform: [
            { translateX: -100 },
            { translateY: -100 }
          ]
        }}
      />
      <View style={{ justifyContent: 'center' }}>
        <UserCard data={user} onPress={() => console.log('Editar imagem')} />
      </View>

      <View style={styles.contentCard}>
        <TextInput placeholder='Nome' style={styles.input} placeholderTextColor='#ccc' value={name} onChangeText={setName} />
        <TextInput placeholder='Email' style={styles.input} placeholderTextColor='#ccc' value={email} onChangeText={setEmail} />
        <TextInput placeholder='Telefone' style={styles.input} placeholderTextColor='#ccc' value={phone} onChangeText={setPhone} />
      </View>

      <TouchableOpacity
          activeOpacity={0.4}
          style={styles.save}
          onPress={() => {
            editProfile({ email, name, phoneNumber: phone });
            goBack();
          }}
          children={(
            <Typography weight={600}>
              Salvar
            </Typography>
          )}
        />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
  },
  contentCard: {
    gap: 10,
    marginHorizontal: 30,
    alignSelf: 'stretch'
  },
  input: {
    backgroundColor: '#fff7',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40
  },
  save: {
    alignSelf: 'center',
    backgroundColor: '#0d4b81',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 3,
  }
});