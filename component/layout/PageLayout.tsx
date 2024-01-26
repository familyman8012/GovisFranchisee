import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@ComponentFarm/atom/Button/Button';
import { Tabs } from '@ComponentFarm/atom/Tab/TabLink';
import {
  PageModeSettings,
  Tab,
} from '@ComponentFarm/template/product/manage/const';
import TitleArea from './TitleArea';

interface ILayout {
  tabData: Tab[];
  subRoot?: boolean;
  currentSettings?: PageModeSettings;
  title?: string;
  isSubmitLoading?: boolean;
  onSubmit?: () => void;
  children: React.ReactNode;
}

const PageLayout: React.FC<ILayout> = ({
  tabData,
  subRoot,
  currentSettings,
  title,
  isSubmitLoading = false,
  onSubmit,
  children,
}) => {
  const router = useRouter();
  const urlArr = router.asPath.split('/');
  const currentUrl = useMemo(
    () => router?.asPath?.split('/')[1],
    [router?.asPath]
  );

  // console.log('urlArr', urlArr);

  const handlerMoveBack = () => {
    // eslint-disable-next-line no-unused-vars
    const { id, ...newObj } = router.query;
    router.push({
      pathname: subRoot
        ? urlArr[urlArr.length - 1].includes('id=')
          ? urlArr.slice(0, urlArr.length - 1).join('/')
          : urlArr.slice(0, urlArr.length - 2).join('/')
        : `/${currentUrl}`,
      query: { ...newObj },
    });
  };

  return (
    <>
      <TitleArea
        title={currentSettings ? currentSettings?.title : String(title)}
        BtnBox={
          <>
            <>
              <Button variant="gostSecondary" onClick={handlerMoveBack}>
                {currentSettings ? currentSettings?.firstButtonText : '이전'}
              </Button>
              {currentSettings && (
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSubmitLoading}
                >
                  {currentSettings?.secondButtonText}
                </Button>
              )}
            </>
          </>
        }
      />
      <Tabs tabs={tabData} />
      {children}
    </>
  );
};

export default PageLayout;
