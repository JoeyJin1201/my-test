import styled from 'styled-components';

import { colors } from '@/utils/colors';

export const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin-top: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background-color: ${colors.neutral300};
    transform: translateX(-50%);

    @media (max-width: 959px) {
      left: 8px;
      transform: none;
    }
  }
`;

export const TimelineItem = styled.div<{ $isLeft: boolean }>`
  display: flex;
  justify-content: ${({ $isLeft }) => ($isLeft ? 'flex-end' : 'flex-start')};
  align-items: flex-start;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 32px;
  }

  @media (max-width: 959px) {
    justify-content: flex-start;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;

export const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  background: linear-gradient(
    135deg,
    ${colors.accent200},
    ${colors.accent300}
  ); /* 使用漸變 */
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 8px ${colors.accent200};

  @media (max-width: 959px) {
    left: 10px;
  }
`;

export const TimelineContent = styled.div<{ $isLeft: boolean }>`
  background-color: ${colors.neutral100};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px ${colors.shadowLight};
  max-width: 360px;

  margin-left: ${({ $isLeft }: { $isLeft: boolean }) =>
    $isLeft ? '32px' : 'auto'};
  margin-right: ${({ $isLeft }: { $isLeft: boolean }) =>
    $isLeft ? 'auto' : '32px'};

  color: ${colors.textBody};

  h4,
  h3 {
    color: ${colors.textPrimary};
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    color: ${colors.textBody};
    margin-bottom: 16px;
  }

  .subtext {
    font-size: 0.85rem;
    color: ${colors.textSecondary};
  }

  @media (min-width: 960px) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 20px ${colors.shadowMedium};
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }
  }

  @media (max-width: 959px) {
    margin-left: 24px;
    margin-right: 0;
  }
`;

export const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
`;
