import styled from 'styled-components';

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
    background-color: #2d3e50;
    transform: translateX(-50%);

    @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    justify-content: flex-start;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;

export const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #00b3a4, #00d2b2);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 8px rgba(0, 210, 178, 0.8);

  @media (max-width: 768px) {
    left: 10px;
  }
`;

export const TimelineContent = styled.div<{ $isLeft: boolean }>`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 360px;

  margin-left: ${({ $isLeft }: { $isLeft: boolean }) =>
    $isLeft ? '32px' : 'auto'};
  margin-right: ${({ $isLeft }: { $isLeft: boolean }) =>
    $isLeft ? 'auto' : '32px'};

  @media (max-width: 768px) {
    margin-left: 24px;
    margin-right: 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }
`;

export const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00b3a4, #007c89);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
`;
