import styled from 'styled-components';

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  margin-top: 8px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

export const SkillCard = styled.div`
  background-color: #3e4e5e;
  border: 1px solid #5e6e7e;
  border-radius: 8px;
  padding: 20px 20px 30px 20px;
  color: #f4f4f4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  h3 {
    color: #00b3a4;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.2rem;
  }

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
      color: #f4f4f4;
    }

    .ant-progress {
      width: 100%;
    }
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
  }
`;
