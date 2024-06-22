import { Container, Progress } from './styles';

type Props = {
  total: number;
  value: number;
}

export function ProgressBar({ total, value }: Props) {
  return (
    <Container>
      <Progress progress={Number(((value / total) * 100))} />
    </Container>
  )
}