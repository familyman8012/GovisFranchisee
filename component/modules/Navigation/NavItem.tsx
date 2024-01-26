import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styled from '@emotion/styled';
import { INavItem } from './interface';
import { SubNavItem } from './SubNavItem';

interface INavItemProps {
  item: INavItem;
  isActive: boolean;
  activeSubNavItem: string;
  open: boolean;
  openDropdown: boolean;
  dropDown: { name: string; haveDepth: boolean };
  onClick: (item: INavItem, subNavPath?: string) => void;
}

const StyledDiv = styled.div`
  position: relative;
`;

const StyledLi = styled.li<{ open: boolean; isActive: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 8px;
  padding: ${props => (props.open ? '0 16px' : '0 8px')};
  margin-left: ${props => (props.open ? '0' : '8px')};
  width: ${props => (props.open ? 'auto' : '40px')};
  background-color: ${props => (props.isActive ? '#f0f9ff' : 'transparent')};
  &:hover .group-hover {
    color: #1f6feb;
  }
`;

const IconWrapper = styled.span<{
  isActive: boolean;
  isToggleSidebar?: boolean;
  open: boolean;
}>`
  transition:
    color 0.3s ease,
    transform 0.3s ease;
  color: ${props => (props.isActive ? '#1f6feb' : '#4b5563')};
  transform: ${props =>
    props.isToggleSidebar && !props.open ? 'rotate(180deg)' : 'none'};
  &:hover {
    color: #1f6feb;
  }
`;

const DropdownContainer = styled.div`
  margin: 8px 0;
`;

const SubnavContainer = styled.div`
  position: absolute;
  top: -12px;
  left: 76px;
  width: 232px;
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  z-index: 50;
`;

export const NavItem = ({
  item,
  isActive,
  activeSubNavItem,
  open,
  openDropdown,
  dropDown,
  onClick,
}: INavItemProps) => {
  return (
    <StyledDiv key={item.label}>
      <StyledLi open={open} isActive={isActive} onClick={() => onClick(item)}>
        <IconWrapper
          isActive={isActive}
          isToggleSidebar={item.toggleSidebar}
          open={open}
        >
          <item.icon.type size={24} {...item.icon.props} />
        </IconWrapper>
        {/* <Typo
          variant="md"
          weight="medium"
          css={`
            flex-grow: 1;
            margin-left: 12px;
            opacity: ${open ? '1' : '0'};
            visibility: ${open ? 'visible' : 'hidden'};
            color: ${isActive ? '#1f6feb' : '#4b5563'};
            &:hover {
              color: #1f6feb;
            }
          `}
        >
          {item.label}
        </Typo> */}
        {item.subItems && item.subItems.length > 0 && (
          <FiChevronDown
            size={20}
            css={`
              transition:
                color 0.3s ease,
                transform 0.3s ease;
              color: ${isActive ? '#1f6feb' : '#9ca3af'};
              ${open ? '' : 'opacity: 0; visibility: hidden;'} ${openDropdown
                ? 'transform: rotate(180deg);'
                : ''}
            `}
          />
        )}
      </StyledLi>

      {openDropdown && open && item.subItems && item.subItems.length > 0 && (
        <DropdownContainer>
          {item.subItems.map(subItem => (
            <SubNavItem
              key={subItem.label}
              isActive={activeSubNavItem === subItem.label}
              subItem={subItem}
              onClick={() => onClick(item, subItem.label)}
            />
          ))}
        </DropdownContainer>
      )}

      {!open &&
        item.subItems &&
        dropDown.name === item.path &&
        dropDown.haveDepth &&
        item.subItems.length > 0 && (
          <SubnavContainer>
            {item.subItems.map(subItem => (
              <SubNavItem
                key={subItem.label}
                inDropdown
                isActive={activeSubNavItem === subItem.label}
                subItem={subItem}
                onClick={() => onClick(item, subItem.label)}
              />
            ))}
          </SubnavContainer>
        )}
    </StyledDiv>
  );
};
