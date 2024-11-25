import styled from 'styled-components';

import { Anchor } from 'antd';

const handleBG = (currentBlock?: string) => {
  switch (currentBlock){
    case '#profile':
      return '#BBDB9B';
    case '#skills':
      return '#ABC4A1';
    case '#experience':
      return '#9DB4AB';
    case '#projects':
      return '#8D9D90';
    default:
      return 'white';
  }
}

export const CustomAnchor = styled(Anchor)`
  && {
    &.ant-anchor-wrapper {
      margin-block-start: unset;
      padding-block-start: unset;

      &.ant-anchor-wrapper-horizontal {
        .ant-anchor {
          padding-inline-start: unset;
          column-gap: 4px;

          .ant-anchor-link {
            background-color: #878E76;
            border-radius: 12px 12px 0 0;
            transition: all ease-in-out 200ms;

            &-title {
              display: block;
              padding: 16px 24px;
            }

            &.ant-anchor-link-active {
              background-color: ${({getCurrentAnchor})=>handleBG(getCurrentAnchor && getCurrentAnchor(''))};

              &>.ant-anchor-link-title-active{
                color: initial;
              }
            }
          }

          .ant-anchor-ink.ant-anchor-ink-visible{
            display: none;
          }
        }

        &::before {
          content: unset;
        }
      }
    }
  }
`;