import { Container, Progress } from './styles';

type Props = {
  progress?: number;
}

export function ProgressBar({ progress = 0 }: Props) {
  return (
    <Container>
      <Progress progress={progress} />
    </Container>
  )
}