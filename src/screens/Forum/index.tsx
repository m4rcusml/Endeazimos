import { Post } from '@components/Post';
import { SearchBar } from '@components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const fakeData: [] = [

]

export function Forum() {
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <FlatList
        data={fakeData}
        ListHeaderComponent={() => <SearchBar />}
        contentContainerStyle={styles.scroll}
        renderItem={() => <Post />}
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