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
      return '#ffffff';
  }
};

export const StyledSection = styled.section<StyledSectionProps>`
  background-color: ${({ $activeKey }) => returnColor($activeKey)};
  transition: background-color ease-in-out 300ms;
`;

export const SectionContainer = styled.div<SectionContainerProps>`
  flex: 1;

  &::before {
    content: '';
    position: fixed;
    top: 36px;
    bottom: 0;
    left: 0;
    right: 0;
    border: 16px solid ${({ $activeKey }) => returnColor($activeKey)};
    z-index: 999;
    transition: border ease-in-out 300ms;
  }
`;
