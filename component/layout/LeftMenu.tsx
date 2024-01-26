import React, { useEffect } from "react";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import { authStore } from "MobxFarm/store";
import Group from "./Group";
import Menu from "./Menu";
import { GroupWrap, LeftMenuWrap, MenuWrap } from "./styles";

const LeftMenu = () => {
  const permissionList = toJS(authStore.permissionList);
  useEffect(() => {
    if (permissionList?.menus === undefined) {
      runInAction(() => {
        authStore.MenuGeneration();
      });
    }
  }, [permissionList?.menus]);
  return (
    <LeftMenuWrap>
      <GroupWrap>
        {permissionList && <Group permissionList={permissionList} />}
      </GroupWrap>
      <MenuWrap>
        {permissionList && <Menu permissionList={permissionList} />}
      </MenuWrap>
    </LeftMenuWrap>
  );
};

export default observer(LeftMenu);
