import styled from 'styled-components';

import { Tabs } from 'antd';

interface CustomTabsProps {
  activeKey: string;
  items: { key: string; label: string }[];
}

const returnBG = (activeKey: string) => {
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

export const CustomTabs = styled(Tabs)<CustomTabsProps>`
  && {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #ffffff;
    padding: 4px 4px 0px 4px;

    &.ant-tabs .ant-tabs-tab {
      padding: 8px 8px;
      border-radius: 8px 8px 0px 0px;
    }

    &.ant-tabs .ant-tabs-tab:nth-child(1) {
      background-color: ${({ items }) => returnBG(items[0].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(2) {
      background-color: ${({ items }) => returnBG(items[1].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(3) {
      background-color: ${({ items }) => returnBG(items[2].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(4) {
      background-color: ${({ items }) => returnBG(items[3].key)};
    }

    &.ant-tabs .ant-tabs-tab:nth-child(5) {
      background-color: ${({ items }) => returnBG(items[4].key)};
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
      column-gap: 2px;
    }
  }
`;
