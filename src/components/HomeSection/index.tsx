import { FlatList } from 'react-native';
import { Typography } from '@components/Typography';
import { Container } from './styles';
import { InstituicaoProps, Item } from './Item';

type Props = {
  title: string;
  data: InstituicaoProps[];
}

export function HomeSection({ title, data }: Props) {
  return (
    <Container>
      <Typography
        size={24}
        weight={800}
      >
        {title}
      </Typography>
      <FlatList
        horizontal
        data={data}
        style={{ marginHorizontal: -16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Item data={item} />}
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16
        }}
      />
    </Container>
  )
}