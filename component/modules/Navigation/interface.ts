import React from 'react';

interface IBaseNavItem {
  order: number;
  path?: string;
  label: string;
}

export interface ISubNavItem extends IBaseNavItem {}

export interface INavItem extends IBaseNavItem {
  icon: React.JSX.Element;
  toggleSidebar?: boolean;
  subItems?: ISubNavItem[];
}
