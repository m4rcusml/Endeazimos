import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@contexts/auth';

import Logo from '@assets/logo.svg';
import { UserCard } from '@components/UserCard';
import { Typography } from '@components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function Contribuinte() {
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
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
        <UserCard data={user} />
      </View>

      <View style={styles.contentCard}>
        <TextInput placeholder='CPF (123.456.789-01)' style={styles.input} placeholderTextColor='#ccc' />
      </View>

      <TouchableOpacity
          activeOpacity={0.4}
          style={styles.save}
          onPress={goBack}
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