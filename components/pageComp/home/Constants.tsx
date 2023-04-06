export const ChannelType = [
  {
    name: "배달의민족",
    keyPrice: ["sum_baemin"],
    keyChannel: ["BAEMIN"],
  },
  {
    name: "요기요",
    keyPrice: ["sum_yogiyo"],
    keyChannel: ["YOGIYO"],
  },
  {
    name: "쿠팡이츠",
    keyPrice: ["sum_coupang"],
    keyChannel: ["COUPANG"],
  },
  {
    name: "땡겨요",
    keyPrice: ["sum_ddangyo"],
    keyChannel: ["DDANGYO"],
  },
  {
    name: "포스",
    keyPrice: ["sum_foodtech", "sum_pos"],
    keyChannel: ["OKPOS", "FOODTECH"],
  },
  {
    name: "키오스크",
    keyPrice: ["sum_kiosk", "sum_unospay"],
    keyChannel: ["KIOSK", "FOODTECH_K", "FOODTECH_ETC-W", "UNOSPAY_K", "KPNP_K", "FOODTECH_ETC-XE"],
  },
];

interface iChannelType {
  [key: string]: number | string;
}

export const getChannelTypeByChannelKey = () => {
  let reVal: iChannelType = {};

  ChannelType.map((row) => {
    const name = row.name;
    row.keyChannel.map((rowSub) => {
      reVal[rowSub] = name;
    });
  });

  return reVal;
};
