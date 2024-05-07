import styled from 'styled-components/native';

export type StyledTextProps = Partial<{
  size: 'small' | 'normal' | 'large';
}>

export const Text = styled.Text<StyledTextProps>`
  color: white;
`;