import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { UserType, useAuth } from '@contexts/auth';

import { Typography } from '@components/Typography';
import { Chat, Heart, PlusCircle, Trash } from 'phosphor-react-native';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export type PostProps = {
  id: string;
  ownerId: string;
  likes?: string[];
  replies?: number;
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
  const [image, setImage] = useState<string>();
  const [isLiked, setIsLiked] = useState(false);
  const [canLike, setCanLike] = useState(true);
  const { user } = useAuth();

  function likePost() {
    if (user && post) {
      setCanLike(false);
      if (post.likes?.includes(user.uid)) {
        firestore().collection('posts').doc(id).update({
          likes: firestore.FieldValue.arrayRemove(...post.likes, user.uid)
        });
      }
      else {
        firestore().collection('posts').doc(id).update({
          likes: firestore.FieldValue.arrayUnion(...post.likes || [], user.uid)
        });
      }
      setIsLiked(!isLiked);
      setCanLike(true);
    }
  }

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
    if (user && post) {
      setIsLiked(!!post.likes?.includes(user.uid))
      storage().ref(post.image).getDownloadURL().then(setImage);
    }
  }, [post?.likes, user]);

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
            style={{ width: 32, aspectRatio: 1, borderRadius: 25, backgroundColor: 'gray' }}
          />
          <Typography color='black'>{owner.name}</Typography>
        </View>

        <Typography color='gray' size={14}>{dayjs().to(post.createdAt.toDate())}</Typography>
      </View>

      {!!image
        ? <Image source={{ uri: image }} style={styles.image} />
        : <View style={styles.noimage}>
          <ActivityIndicator size='large' color='black' />
        </View>}

      <View style={styles.footer}>
        <TouchableOpacity
          style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}
          onPress={() => { }}
        >
          <Trash color='#0c4b7e' weight='bold' size={28} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity
            style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}
            onPress={() => { }}
          >
            <Typography color='#0c4b7e' weight={500} size={14}>{post.replies || 0}</Typography>
            <Chat color='#0c4b7e' weight='bold' size={28} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}
            onPress={likePost}
            disabled={!canLike}
          >
            <Typography color='#0c4b7e' weight={500} size={14}>{post.likes?.length || 0}</Typography>
            <Heart color='#0c4b7e' weight={isLiked ? 'fill' : 'bold'} size={28} />
          </TouchableOpacity>
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
    aspectRatio: '4 / 3',
    resizeMode: 'cover'
  },
  noimage: {
    width: '100%',
    aspectRatio: '4 / 3',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});