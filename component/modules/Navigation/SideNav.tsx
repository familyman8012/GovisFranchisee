import React, { FC, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { images } from '@ComponentFarm/atom/Select/sampleData';
import { theme } from '@ComponentFarm/theme';
import { INavItem } from './interface';
import { NavItem } from './NavItem';

export const renderLogo = () => (
  <img
    src={images.logo}
    css={css`
      width: 2rem;
      height: 2rem;
      user-select: none;
    `}
    alt="logo"
  />
);

export interface ISideNavProps {
  className?: string;
  navItemsTop: INavItem[];
  navItemsBottom: INavItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
  email: string;
}

const Logo = styled.img`
  width: 2rem;
  height: 2rem;
  user-select: none;
`;

const SidebarContainer = styled.div<{ open: boolean }>`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${theme.colors.white};
  transition: transform 0.1s ease-out;
  overflow-y: auto;
  border-right: 1px solid ${theme.colors.gray200};
  width: ${props => (props.open ? '20rem' : '6rem')};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  margin-left: 2.25rem;
`;

const SidebarContent = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 1.25rem;
  width: ${props => (props.open ? '17.5rem' : '3.5rem')};
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SidebarSeparator = styled.hr<{ open: boolean }>`
  margin-left: 1.25rem;
  border-top: 1px solid ${theme.colors.gray200};
  width: ${props => (props.open ? '17.5rem' : '3.5rem')};
`;

const UserInfoContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: 17.5rem;
  margin-left: 1.75rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const UserDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.75rem;
`;

export const SideNav: FC<ISideNavProps> = ({
  className,
  navItemsTop,
  navItemsBottom,
  open,
  setOpen,
  username,
  email,
}) => {
  // const [searchString, setSearchString] = useState<string>('');
  const [activeNavItem, setActiveNavItem] = useState<string>('');
  const [activeSubNavItem, setActiveSubNavItem] = useState<string>('');
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [dropDown, setDropDown] = useState({ name: '', haveDepth: false });

  // const handleSearch = (value: string) => setSearchString(value);

  const onClickNavItem = (item: INavItem, subNavPath?: string) => {
    setDropDown({ name: String(item.path), haveDepth: !!item.subItems });

    if (subNavPath) {
      setActiveSubNavItem(subNavPath);
    }
    if (!item.toggleSidebar) {
      setActiveNavItem(item.label);
    } else if (item.toggleSidebar) {
      setOpen(!open);
    }

    if (item.subItems && openDropdowns.includes(item.label) && !subNavPath) {
      setOpenDropdowns(
        openDropdowns.filter(dropdownItem => dropdownItem !== item.label)
      );
    } else if (item.subItems && !openDropdowns.includes(item.label)) {
      setOpenDropdowns([...openDropdowns, item.label]);
    }
  };

  return (
    <SidebarContainer open={open}>
      <LogoContainer>
        <Logo src={images.logo} alt="logo" />
        {/* <Typo
          variant="xl"
          css={css`
            margin-left: 0.625rem;
            white-space: nowrap;
            user-select: none;
            ${!open && 'opacity: 0; visibility: hidden;'}
          `}
          weight="medium"
        >
          My Travel App
        </Typo> */}
      </LogoContainer>

      <div
        css={css`
          margin-bottom: 2rem;
          margin-left: 2.25rem;
        `}
      >
        {open ? (
          // <TextInput
          //   type="text"
          //   value={searchString}
          //   handleChange={handleSearch}
          //   placeholder="Search"
          //   LeadingIcon={<FiSearch />}
          // />
          <div>1</div>
        ) : (
          <div
            css={css`
              height: 2.75rem;
            `}
          />
        )}
      </div>

      <SidebarContent open={open}>
        <ItemList>
          {navItemsTop.map(item => (
            <NavItem
              key={item.label}
              item={item}
              isActive={activeNavItem === item.label}
              activeSubNavItem={activeSubNavItem}
              open={open}
              openDropdown={openDropdowns.includes(item.label)}
              dropDown={dropDown}
              onClick={onClickNavItem}
            />
          ))}
        </ItemList>
        <ItemList
          css={css`
            margin-bottom: 1.5rem;
          `}
        >
          {navItemsBottom.map(item => (
            <NavItem
              key={item.label}
              item={item}
              isActive={activeNavItem === item.label}
              activeSubNavItem={activeSubNavItem}
              open={open}
              openDropdown={openDropdowns.includes(item.label)}
              dropDown={dropDown}
              onClick={onClickNavItem}
            />
          ))}
        </ItemList>
      </SidebarContent>

      <SidebarSeparator open={open} />

      <UserInfoContainer>
        <Avatar src={images.demoAvatar} alt="avatar" />
        {open ? (
          <UserDetail>
            <div
              css={css`
                user-select: none;
              `}
            >
              {/* <Typo
                variant="sm"
                weight="medium"
                color="text-gray-700 dark:text-white"
              >
                {username}
              </Typo>

              <Typo variant="sm" color="text-gray-500">
                {email}
              </Typo> */}
            </div>

            <FiLogOut
              size={24}
              css={css`
                margin-left: 1.5rem;
                color: #a0aec0;
                cursor: pointer;
              `}
            />
          </UserDetail>
        ) : null}
      </UserInfoContainer>
    </SidebarContainer>
  );
};
