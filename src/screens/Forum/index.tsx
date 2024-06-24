import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';

import { Post, PostProps } from '@components/Post';
import { SearchBar } from '@components/SearchBar';
import { Typography } from '@components/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

export function Forum() {
  const { top } = useSafeAreaInsets();
  const [campanhas, setCampanhas] = useState<{id: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchPosts() {
    setIsLoading(true);
    firestore().collection('posts').get()
      .then(response => {
        setCampanhas(response.docs.map(doc => ({
          id: doc.id
        })));
        setIsLoading(false);
      });
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <FlatList
        data={campanhas}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        ListHeaderComponent={() => <SearchBar />}
        renderItem={({ item }) => <Post id={item.id} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.scroll}
        ListEmptyComponent={() => (
          !isLoading && <Typography style={{ paddingVertical: 20 }}>Nada encontrado</Typography>
        )}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 30
  }
});