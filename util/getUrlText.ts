import { TotalMenu } from '@ComponentFarm/layout/MenuData';

export function getUrlText(urlPath: string) {
  const path = urlPath.split('/')[1].split('?')[0];

  const routeInfo = TotalMenu.find(
    menu =>
      (menu.path && `${menu.path}/` === `/${path}/`) ||
      (menu.depth2 && menu.depth2.some(item => item.path.includes(path)))
  );

  if (!routeInfo) {
    return null;
  }

  if (routeInfo.path && routeInfo.path.includes(path)) {
    return routeInfo.depth1;
  }

  const depth2Item =
    routeInfo.depth2 && routeInfo.depth2.find(item => item.path.includes(path));
  return depth2Item ? depth2Item.name : null;
}
