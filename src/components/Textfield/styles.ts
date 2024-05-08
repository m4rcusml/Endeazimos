import styled from 'styled-components/native';

export const Container = styled.View<{ filled?: boolean }>`
  background-color: ${({ filled }) => filled ? '#FDFDFD66' : 'transparent'};
  border: 1px solid ${({ filled }) => filled ? '#FDFDFD66' : '#FDFDFD'};
  border-radius: 10px;
  padding: 10px 10px;
  overflow: hidden;
`;

export const Input = styled.TextInput.attrs<{ filled?: boolean }>(({ filled }) => ({
  placeholderTextColor: filled ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
  cursorColor: filled ? 'black' : 'white'
}))`
  color: white;
`;