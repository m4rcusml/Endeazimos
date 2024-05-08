import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6
}))<{ filled?: boolean }>`
  background-color: ${({ filled }) => filled ? 'white' : 'transparent'};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  border: 1.5px solid white;
  border-radius: 40px;
  padding: 10px 25px;
  align-items: center;
`;