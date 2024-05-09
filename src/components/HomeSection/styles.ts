import styled from 'styled-components/native';

export const Container = styled.View`
  gap: 20px;
`;

export const ItemContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6
}))`
  align-items: center;
  width: 150px;
  gap: 10px;
`;