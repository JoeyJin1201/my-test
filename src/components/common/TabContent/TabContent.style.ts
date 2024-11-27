import styled from 'styled-components';

interface StyledSectionProps {
  $activeKey: string;
}

interface SectionContainerProps extends StyledSectionProps {}

const returnColor = (activeKey: string) => {
  switch (activeKey) {
    case 'profile':
      return '#f4f6f9';
    case 'skills':
      return '#d9e1e8';
    case 'experience':
      return '#c2ccd4 ';
    case 'projects':
      return '#aebbc3';
    case 'contact':
      return '#97a7b1';
    default:
      return '#f4f6f9';
  }
};

export const SectionsContainer = styled.div<SectionContainerProps>`
  flex: 1;
`;

export const StyledSection = styled.section<StyledSectionProps>`
  min-height: calc(100vh - 36px);
  background-color: ${({ $activeKey }) => returnColor($activeKey)};
  transition: background-color ease-in-out 300ms;
`;

export const SectionContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 16px;
  padding: 16px;

  @media screen and (max-width: 768px) {
    row-gap: 8px;
  }

  h2 {
    height: 32px;
    font-size: 32px;
    font-weight: bold;
  }
`;
