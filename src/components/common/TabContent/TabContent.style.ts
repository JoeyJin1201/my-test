import styled from 'styled-components';

import { colors } from '@/utils/colors';

interface StyledSectionProps {
  $activeKey: string;
}

interface SectionContainerProps extends StyledSectionProps {}

const returnColor = (activeKey: string) => {
  switch (activeKey) {
    case 'profile':
      return colors.blueGray100;
    case 'skills':
      return colors.blueGray200;
    case 'experience':
      return colors.blueGray300;
    case 'projects':
      return colors.blueGray400;
    case 'contact':
      return colors.blueGray500;
    default:
      return colors.neutral100;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 16px;
  padding: 24px;

  @media (max-width: 959px) {
    row-gap: 8px;
  }

  h2 {
    height: 32px;
    font-size: 32px;
    font-weight: bold;
  }
`;
