import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7
}))`
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding: 20px 10px;
  gap: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: space-between;
`;