import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import firestore from '@react-native-firebase/firestore';

import { CampanhaButton, CampanhaProps } from '@components/CampanhaButton';
import { Typography } from '@components/Typography';

export function Campanhas() {
  const { top } = useSafeAreaInsets();
  const [campanhas, setCampanhas] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchCampanhas() {
    setIsLoading(true);
    firestore().collection('campanhas').get()
      .then(response => {
        setCampanhas(response.docs.map(doc => ({
          id: doc.id
        })));
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchCampanhas();
  }, []);

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <FlatList
        data={campanhas}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchCampanhas} />}
        ListHeaderComponent={() => <Typography size={28} weight={600} alignment='center' children={'Campanhas'} />}
        renderItem={({ item }) => <CampanhaButton id={item.id} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.scroll}
        ListEmptyComponent={() => (
          !isLoading && <Typography style={{ paddingVertical: 20 }} alignment='center' color='gray'>Nada encontrado</Typography>
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
    paddingBottom: 100,
    paddingTop: 20,
    gap: 20
  }
});