import styled from 'styled-components';

import { colors } from '@/utils/colors';

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  margin-top: 8px;

  @media (max-width: 959px) {
    gap: 16px;
  }
`;

export const SkillCardWrapper = styled.div`
  display: inline-block;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const SkillCard = styled.div`
  background-color: ${colors.neutral100};
  border: 1px solid ${colors.neutral300};
  border-radius: 8px;
  padding: 24px 24px 32px 24px;
  color: ${colors.neutral700};
  box-shadow: 0 4px 12px ${colors.shadowLight};
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  .skill-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }

    .skill-name {
      font-size: 18px;
      font-weight: 500;
      color: ${colors.neutral700};
    }

    .ant-progress {
      width: 100%;

      .ant-progress-bg {
        background: linear-gradient(
          90deg,
          ${colors.accent300} 0%,
          ${colors.accent200} 100%
        );
      }

      .ant-progress-trail {
        background-color: ${colors.neutral400};
      }
    }
  }
`;
