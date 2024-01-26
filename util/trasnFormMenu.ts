export const transFormMenu = (data: any) => {
  const transformedData: any = [];
  data.list.forEach((item: any) => {
    const depth1 = item.perm_info_name_1;
    const depth2 = {
      name: item.perm_info_name_2,
      perm_code: item.perm_code_2,
      perm_info_idx: item.perm_info_idx_2,
    };
    // Check if depth1 already exists
    let exists = false;
    transformedData.forEach((d: any) => {
      if (d.depth1 === depth1) {
        d.depth2.push(depth2);
        exists = true;
      }
    });
    if (!exists) {
      transformedData.push({
        depth1,
        depth2: [depth2],
      });
    }
  });
};
