import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 16px;
  min-height: calc(100vh - 36px);
  padding: 16px;

  h2 {
    height: 32px;
    font-size: 32px;
    font-weight: bold;
  }
`;
