import styled from 'styled-components';
import { space } from 'styled-system';
import type { SpaceProps } from 'styled-system';

type ModalActionsProps = SpaceProps;

export const ModalActions = styled.div<ModalActionsProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.space[2]}px;
  ${space};
`;
