import styled, { css } from 'styled-components/native';

export type StyledTextProps = Partial<{
  // weight: 'light' | 'normal' | 'bold';
  // size: 'small' | 'normal' | 'large';
  alignment: 'left' | 'center' | 'right';
  weight: number;
  size: number;
  color: string;
}>

export const Text = styled.Text<StyledTextProps>`
  ${({
    size = 16,
    weight = 400,
    color = 'white',
    alignment = 'left'
  }) => css`
    color: ${color};
    font-size: ${size}px;
    font-weight: ${weight};
    text-align: ${alignment};
  `}
`;