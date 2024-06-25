import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import * as ImagePicker from 'expo-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useAuth } from '@contexts/auth';

import { GenericButton } from '@components/GenericButton';
import { Typography } from '@components/Typography';
import { useNavigation } from '@react-navigation/native';

export function CreatePost() {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
      aspect: [4, 3]
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function uploadImage() {
    if (image) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      var ref = storage().ref().child(filename).put(blob);
      try {
        await ref;
        return filename;
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handlePost() {
    if (user && image) {
      setIsLoading(true);
      uploadImage().then((filename) => {
        if (filename) {
          firestore().collection('posts').add({
            ownerId: user.uid,
            image: filename,
            createdAt: firestore.Timestamp.now(),
          })
            .then(() => {
              Alert.alert('Sucesso', 'Publicação enviada com sucesso.');
              goBack();
            })
            .catch(error => {
              setIsLoading(false);
              console.log(error);
              Alert.alert('Erro', 'Não foi possível enviar a publicação.');
            });
        }
      })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
          Alert.alert('Erro', 'Não foi possível enviar a publicação.');
        })
    }
  }

  if (!user) {
    return (
      <LinearGradient
        colors={['#125266', '#104C5F']}
        style={[styles.background, { paddingTop: top, justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size='large' color='white' />
      </LinearGradient>
    )
  }

  if (user.type === 'instituicao' || user.type === 'contribuinte') {
    return (
      <LinearGradient
        colors={['#125266', '#104C5F']}
        style={[styles.background, { paddingTop: top, justifyContent: 'center', alignItems: 'center' }]}
      >
        <Typography color='white' size={18}>
          Você não é uma instituição.
        </Typography>
        <GenericButton title='Voltar' onPress={() => goBack()} filled />
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top + 60 }]}
    >
      <View style={{ gap: 15, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: user.photo }}
          style={{ width: 40, height: 40, borderRadius: 48, backgroundColor: 'gray' }}
        />
        <Typography color='white' size={18}>{user.name}</Typography>
      </View>

      <TouchableOpacity style={[styles.imageInput, !!image && { backgroundColor: '#fff4' }]} onPress={handleImage}>
        <Typography color='white' size={16}>
          {!!image ? 'Adicionada com sucesso' : 'Adicione uma imagem'}
        </Typography>
      </TouchableOpacity>

      <GenericButton title='Publicar' onPress={handlePost} disabled={isLoading} filled />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 30
  },
  imageInput: {
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    aspectRatio: '20 / 8'
  }
});