import styled from 'styled-components';

import { Layout } from 'antd';

export const CustomLayoutContent = styled(Layout.Content)`
  &[data-current-block="#profile"] {
    background-color: #BBDB9B;
  }

  &[data-current-block="#skills"] {
    background-color: #ABC4A1;
  }

  &[data-current-block="#experience"] {
    background-color: #9DB4AB;
  }

  &[data-current-block="#projects"] {
    background-color: #8D9D90;
  }

  margin-top: 64px;
  padding: 12px;
  transition: all ease-in-out 200ms;
`;