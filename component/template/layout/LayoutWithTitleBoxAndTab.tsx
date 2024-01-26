import React, { useMemo, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Tabs } from '@ComponentFarm/atom/Tab/Tab';
import TitleArea from '@ComponentFarm/layout/TitleArea';

export interface LayoutWithTitleBoxAndTabProps {
  id?: string;
  title: string;
  actionButtons?: ReactNode;
  tabs: { title: string; path: string }[];
}

const BoxStyle = styled.div`
  h1 {
    min-height: 4.4rem;
  }
`;

const LayoutTitleBoxWithTab = ({
  id,
  title,
  tabs,
  actionButtons,
  children,
}: React.PropsWithChildren<LayoutWithTitleBoxAndTabProps>) => {
  const router = useRouter();
  const pathname = useMemo(() => router.asPath.split('?')[0], [router]);

  const getMergedDynamicParamPath = useCallback(
    (path: string) =>
      path
        .split('/')
        .map(v => {
          const returnVal =
            v.search(/\[.*\]$/) !== -1
              ? router.query[v.replace(/\[(.*)\]/, '$1')]
                  ?.toString()
                  .split(',')
                  .filter?.(str => !Number.isNaN(Number(str)))
              : v;
          return returnVal?.toString();
        })
        .join('/'),
    [pathname, router.query]
  );

  const replacedPathTabs = useMemo(
    () =>
      tabs.map(tab => {
        return {
          ...tab,
          path: getMergedDynamicParamPath(tab.path),
        };
      }),
    [tabs, router.query]
  );

  const activeIndex = useMemo(() => {
    return replacedPathTabs.findIndex(({ path }) => {
      return pathname === path;
    });
  }, [pathname, replacedPathTabs]);

  return (
    <BoxStyle>
      <TitleArea title={title} BtnBox={actionButtons} />
      <Tabs
        id={id ?? ''}
        key={id ?? ''}
        tabs={replacedPathTabs}
        activeTabIndex={activeIndex}
        onTabChange={index => {
          if (activeIndex === index) return;
          router.push(replacedPathTabs[index].path);
        }}
      />
      {children}
    </BoxStyle>
  );
};

export default LayoutTitleBoxWithTab;
