import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #B4A9A9;
  border-radius: 15px;
  height: 28px;
  overflow: hidden;
`;

export const Progress = styled.View<{ progress: number }>`
  background-color: #840AFF77;
  border-radius: 15px;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  width: ${({ progress }) => progress}%;
`;