import { HomeSection } from '@components/HomeSection';
import { SearchBar } from '@components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const fakeData = [
  {
    name: 'Anjos de Rua - Manaus',
    image: 'data:image/png;base64,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'
  },
  {
    name: 'Abrigo NACER',
    image: 'data:image/jpeg;base64,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'
  },
  {
    name: 'Abrigo O Coração do Pai',
    image: 'data:image/png;base64,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'
  }
]

export function Home() {
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#125266', '#104C5F']}
      style={[styles.background, { paddingTop: top }]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <SearchBar />

        <HomeSection
          title='Mais pesquisadas'
          data={fakeData}
        />

        <HomeSection
          title='Com base nas suas pesquisas'
          data={fakeData}
        />

        <HomeSection
          title='Campanhas em andamento'
          data={fakeData}
        />
      </ScrollView>
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