import { Container, Input } from './styles';
import { Feather } from '@expo/vector-icons';

export function SearchBar() {
  return (
    <Container>
      <Feather name='search' size={24} color={'#0007'} />
      <Input placeholder='Pesquisar' />
    </Container>
  )
}