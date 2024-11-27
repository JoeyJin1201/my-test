import styled from 'styled-components';

import { colors } from '@/utils/colors';

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${colors.neutral200},
    ${colors.neutral100}
  );
  border-radius: 16px;
  box-shadow: 0 4px 16px ${colors.shadowLight};
  padding: 24px;
  margin: 16px 0 0 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Avatar = styled.div`
  width: 192px;
  height: 192px;
  background-color: ${colors.accent200};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: ${colors.neutral100};
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-right: 16px;
    margin-bottom: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: ${colors.textPrimary};
    margin-bottom: 8px;
  }

  .title {
    font-size: 1rem;
    color: ${colors.textSecondary};
    margin-bottom: 16px;
  }

  ul {
    list-style-type: disc;
    margin: 16px 0 0 20px;
    padding: 0;
    color: ${colors.textBody};

    li {
      margin-bottom: 8px;
      font-size: 0.9rem;
    }
  }

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;
