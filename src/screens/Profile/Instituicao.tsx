import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '@contexts/auth';

import { UserCard } from '@components/UserCard';
import { Typography } from '@components/Typography';
import { useNavigation } from '@react-navigation/native';
import Logo from '@assets/logo.svg';

export function Instituicao() {
  const { top } = useSafeAreaInsets();
  const { user, expand } = useAuth();
  const { goBack } = useNavigation();

  const [cnpj, setCnpj] = useState('');
  const [cnae, setCnae] = useState('');
  
  function handleExpand() {
    if(cnpj.trim() && cnae.trim()) {
      expand('instituicao', { cnpj, cnae }).then(() => {
        Alert.alert('Sucesso', 'Instituição cadastrada com sucesso');
        goBack();
      });
    }
  }
  
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
        <TextInput
          placeholder='CNPJ (12.345.678/0001-00)'
          placeholderTextColor='#ccc'
          style={styles.input}
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType='numeric'
          />
        <TextInput
          placeholder='CNAE (12.34-5/67)'
          placeholderTextColor='#ccc'
          style={styles.input}
          value={cnae}
          onChangeText={setCnae}
          keyboardType='numeric'
          />
      </View>

      <TouchableOpacity
          activeOpacity={0.4}
          style={styles.save}
          onPress={handleExpand}
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