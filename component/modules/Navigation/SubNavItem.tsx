import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@ComponentFarm/theme';
import { ISubNavItem } from './interface';

interface ISubNavItemProps {
  inDropdown?: boolean;
  isActive: boolean;
  subItem: ISubNavItem;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

const StyledLi = styled.li<{ inDropdown: boolean; isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  font-size: ${theme.fontSize.md[0]};
  white-space: nowrap;
  transition: all 0.1s ease-out;
  color: ${({ isActive }) =>
    isActive ? theme.colors.primary600 : theme.colors.gray800};
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primary50 : 'transparent'};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? theme.colors.primary50 : theme.colors.gray100};
  }

  & .typography {
    flex-grow: 1;
    padding-left: ${({ inDropdown }) => (inDropdown ? '16px' : '52px')};
    color: ${({ isActive }) =>
      isActive ? theme.colors.primary600 : theme.colors.gray800};

    &:hover {
      color: ${theme.colors.primary600};
    }
  }
`;

export const SubNavItem: React.FC<ISubNavItemProps> = ({
  inDropdown = false,
  isActive,
  subItem,
  onClick,
}) => (
  <StyledLi inDropdown={inDropdown} isActive={isActive} onClick={onClick}>
    {/* <Typo variant="md" weight="medium" className="typography">
      {subItem.label}
    </Typo> */}
  </StyledLi>
);
