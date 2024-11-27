import styled from 'styled-components';

import { Tabs } from 'antd';

import { colors } from '@/utils/colors';

interface CustomTabsProps {
  activeKey: string;
  items: { key: string; label: string }[];
}

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
    case 'admin':
      return 'salmon';
    default:
      return colors.neutral100;
  }
};

export const CustomTabs = styled(Tabs)<CustomTabsProps>`
  && {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #ffffff;
    padding: 4px 4px 0px 4px;

    &.ant-tabs .ant-tabs-tab {
      padding: 8px;
      border-radius: 8px 8px 0px 0px;

      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      transition: box-shadow ease-in-out 100ms;

      @media (min-width: 960px) {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
      }

      &:hover {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.45);

        @media (min-width: 960px) {
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
        }
      }

      &.ant-tabs-tab-active {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);

        @media (min-width: 960px) {
          box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
        }
      }

      @media (min-width: 960px) {
        padding: 10px 16px;
      }
    }

    &.ant-tabs .ant-tabs-tab:nth-child(1) {
      background-color: ${({ items }) => returnColor(items[0].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(2) {
      background-color: ${({ items }) => returnColor(items[1].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(3) {
      background-color: ${({ items }) => returnColor(items[2].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(4) {
      background-color: ${({ items }) => returnColor(items[3].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(5) {
      background-color: ${({ items }) => returnColor(items[4].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(6) {
      background-color: ${({ items }) => returnColor(items[5]?.key)};
    }

    &.ant-tabs-top > .ant-tabs-nav,
    &.ant-tabs-bottom > .ant-tabs-nav,
    &.ant-tabs-top > div > .ant-tabs-nav,
    &.ant-tabs-bottom > div > .ant-tabs-nav {
      margin: unset;
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap::before,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap::before,
    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap::after,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap::after {
      content: unset;
    }

    &.ant-tabs-top > .ant-tabs-nav::before,
    &.ant-tabs-bottom > .ant-tabs-nav::before,
    &.ant-tabs-top > div > .ant-tabs-nav::before,
    &.ant-tabs-bottom > div > .ant-tabs-nav::before {
      content: unset;
    }

    &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
      margin: unset;
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
      column-gap: 4px;
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
      @media (min-width: 390px) {
        justify-content: center;
      }
    }
  }
`;
