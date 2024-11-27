import styled from 'styled-components';

export const KeyInText = styled.span`
  font-size: 1em;
  white-space: nowrap;
  position: relative;

  .cursor {
    position: absolute;
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: currentColor;
    margin-left: 2px;
    animation: blink 0.8s step-end infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;
