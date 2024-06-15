
import styled from '@emotion/styled';
import {
  space,
  layout,
  flexbox,
  typography,
  color,
  border,
} from 'styled-system';

const Flex = styled.div`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
`;

const Box = styled.div`
  ${space}
  ${layout}
  ${border}
`;

const Input = styled.input`
  ${space}
  ${layout}
  ${typography}
  ${color}
`;

const Button = styled.button`
  ${space}
  ${layout}
  ${typography}
  ${color}
  ${border}
`;

export { Flex, Box, Input, Button };
