import { IOption } from "InterfaceFarm/material";

// react-hook-form 으로 받아온 데이터를 서버에 보내야하는 형식으로 변환.
export const convertServerFormat = (
  flatData: { [key: string]: string },
  selOption: IOption[]
) => {
  const result: any = { material_shipping_data: [] };

  const companiesMap: { [key: string]: any } = {};

  Object.keys(flatData).forEach((key) => {
    const [companyId, regionId] = key.split("_");
    const companyLabel = selOption.find(
      (item) => String(item.value) === String(companyId)
    )?.label;
    if (!companyLabel) return;

    if (!companiesMap[companyId]) {
      companiesMap[companyId] = {
        pci_shipping_company: companyId, // 여기를 수정
        area_period_list: [],
      };
    }

    companiesMap[companyId].area_period_list.push({
      evi_area: regionId, // 여기를 수정
      period_day: Number(flatData[key]),
    });
  });

  result.material_shipping_data = Object.values(companiesMap);
  return result;
};

// 서버에서 받아온 데이터를 initiaData 구조로 변환
export const convertInitialFormat = (data: any) => {
  const result: { [key: string]: string } = {};

  data?.forEach((company: any) => {
    const companyId = company.pci_shipping_company; // 수정된 부분
    company.area_period_list.forEach((area: any) => {
      const regionId = area.evi_area; // 수정된 부분
      result[`${companyId}_${regionId}`] = String(area.period_day);
    });
  });

  return result;
};

// 서버에서 받아온 물류사 정보를 select 값으로 사용하기 위해 변환
export const convertToLabelValueFormat = (data: any[]) => {
  return data.map((item) => ({
    label: item.partner_company_name,
    value: item.partner_company_idx,
  }));
};
