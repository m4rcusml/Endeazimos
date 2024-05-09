import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6
}))<{ filled?: boolean }>`
  background-color: ${({ filled }) => filled ? 'white' : 'transparent'};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  border: 1.5px solid white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  padding: 10px 25px;
  gap: 5px;
`;