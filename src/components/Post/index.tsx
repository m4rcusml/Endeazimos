import { UserType } from '@contexts/auth';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Typography } from '@components/Typography';

export type PostProps = {
  id: string;
  ownerId: string;
  likes: number;
  replies: number;
  createdAt: string;
  image: string;
}

type Props = {
  data: PostProps;
}

export function Post({ data }: Props) {
  const [owner, setOwner] = useState<UserType>();

  useEffect(() => {
    firestore().collection('users').where('uid', '==', data.ownerId).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        setOwner(doc.data() as UserType);
      });
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: owner?.photo }}
          style={{ width: 40, height: 40, borderRadius: 25 }}
        />
        <Typography color='black'>{owner?.name}</Typography>
      </View>

      <Image source={{ uri: data.image }} style={styles.image} />

      <View style={styles.footer}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15
  },
  header: {
    padding: 10,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  footer: {
    padding: 10,
    gap: 10,
    flexDirection: 'row'
  }
});