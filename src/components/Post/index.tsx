import { UserType } from '@contexts/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Typography } from '@components/Typography';
import { Chat, Heart, PlusCircle } from 'phosphor-react-native';

export type PostProps = {
  id: string;
  ownerId: string;
  likes: number;
  replies: number;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  image: string;
}

type Props = {
  data?: PostProps;
  id: string;
}

export function Post({ id }: Props) {
  const [post, setPost] = useState<PostProps>();
  const [owner, setOwner] = useState<UserType>();

  useEffect(() => {
    if (post) {
      firestore().collection('users').where('uid', '==', post.ownerId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setOwner(doc.data() as UserType);
        });
      })
    }
  }, [post]);

  useEffect(() => {
    const unsubscribe = firestore().collection('posts').doc(id).onSnapshot(querySnapshot => {
      setPost(querySnapshot.data() as PostProps);
    });

    return () => unsubscribe();
  }, []);

  if (!(post && owner)) {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <ActivityIndicator size='large' color='black' />
        <View style={styles.footer} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: owner.photo }}
            style={{ width: 32, height: 32, borderRadius: 25 }}
          />
          <Typography color='black'>{owner.name}</Typography>
        </View>

        <Typography color='gray'>{post.createdAt.toDate().toDateString()}</Typography>
      </View>

      <Image source={{ uri: post?.image }} style={styles.image} />

      <View style={styles.footer}>
        <PlusCircle color='#0c4b7e' weight='bold' size={28} />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Chat color='#0c4b7e' weight='bold' size={28} />
          <Heart color='#0c4b7e' weight='bold' size={28} />
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});