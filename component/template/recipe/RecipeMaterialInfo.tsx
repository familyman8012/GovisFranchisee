import { IoAlertCircleOutline } from "react-icons/io5";
import { IMaterialInfoViewItem } from "InterfaceFarm/product";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Pic from "@ComponentFarm/atom/icons/Pic";
import { Table, TableWrap } from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { getComputedCost, toPrice } from "@UtilFarm/number";
import { MaterialInfoStyle } from "./style";

interface MaterialInfo {
  recipe_info_material_sale_cost?: number;
  recipe_info_material_purchase_cost?: number;
  recipe_material_list: IMaterialInfoViewItem[];
}

interface Props {
  materialInfo: MaterialInfo;
}

const RecipeMaterialInfo = ({ materialInfo }: Props) => {
  return (
    <MaterialInfoStyle>
      <h2>원재료 목록</h2>
      <TableWrap>
        <Table className="basic">
          <colgroup>
            <col width={getTableWidthPercentage(650)} />
            <col width={getTableWidthPercentage(120)} />
            <col width={getTableWidthPercentage(200)} />
            <col width={getTableWidthPercentage(200)} />
            <col width={getTableWidthPercentage(183)} />
            <col width={getTableWidthPercentage(183)} />
          </colgroup>
          <thead>
            <tr>
              <th>원재료명</th>
              <th>수량</th>
              <th>거래처명</th>
              <th>원산지명</th>
              <th>매입 원가</th>
              <th>판매 원가</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="box_total_price_label">
                <span className="label">원가 총액</span>
              </td>
              <td>
                <span className="box_total_price">
                  <span className="price">
                    {`${toPrice(
                      (
                        materialInfo?.recipe_info_material_purchase_cost ?? 0
                      ).toFixed(2)
                    )}원`}
                  </span>
                </span>
              </td>
              <td>
                <span className="box_total_price">
                  <span className="price">
                    {`${toPrice(
                      (
                        materialInfo?.recipe_info_material_sale_cost ?? 0
                      ).toFixed(2)
                    )}원`}
                  </span>
                </span>
              </td>
            </tr>
            {materialInfo?.recipe_material_list.length > 0 ? (
              materialInfo?.recipe_material_list?.map((materialInfoItem) => (
                <tr key={materialInfoItem.material_info_idx}>
                  <td>
                    <span className="box_material_info_name">
                      <span className="thumb">
                        {materialInfoItem.material_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={materialInfoItem.material_image ?? ""}
                            alt=""
                          />
                        ) : (
                          <Pic size={20} />
                        )}
                      </span>
                      {materialInfoItem.material_name_ko}
                    </span>
                  </td>
                  <td>
                    {materialInfoItem.recipe_material_quantity_value}
                    {materialInfoItem.evi_recipe_material_quantity_unit_str}
                  </td>
                  <td>{materialInfoItem.partner_company_name}</td>
                  <td>{materialInfoItem.evi_country_str?.[0]}</td>
                  <td>
                    {`${getComputedCost(
                      materialInfoItem.purchase_cost,
                      materialInfoItem.recipe_material_quantity_value
                    )}원`}
                    ({`${materialInfoItem.purchase_cost}원`})
                  </td>
                  <td>
                    {`${getComputedCost(
                      materialInfoItem.sale_cost,
                      materialInfoItem.recipe_material_quantity_value
                    )}원`}
                    ({`${materialInfoItem.sale_cost}원`})
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Empty Icon={<IoAlertCircleOutline size={42} />}>
                    원재료가 등록되지 않았습니다.
                    <br />
                    원재료를 등록해주세요.
                  </Empty>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrap>
    </MaterialInfoStyle>
  );
};

export default RecipeMaterialInfo;
