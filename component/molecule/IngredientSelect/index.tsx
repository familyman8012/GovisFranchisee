import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchCommonMaterialList } from "ApiFarm/common";
import { MaterialInfo } from "InterfaceFarm/material";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { InnerTable } from "@ComponentFarm/common";
import SearchKeyword, {
  SearchkeywordType,
} from "../SearchKeyword/SearchKeyword";

interface Props {
  onSelect: (selectedList: MaterialInfo[]) => void;
}

const IngredientModalContent = styled.div`
  max-width: 87.4rem;
  width: 80vw;

  .search {
    display: flex;
    align-items: center;
    height: 6.4rem;
    input {
      width: 100%;
    }
    &:not(:first-of-type) {
      flex: 1;
      margin-bottom: 2.4rem;
    }

    h3 {
      display: flex;
      align-items: center;
      padding: 0.8rem 2rem;
      color: var(--color-gray500);
      font-weight: 500;
      width: 32%;
      min-width: 13.3rem;
      border-right: inherit;
      border-bottom: 0;
      background-color: var(--table-headerBackground);
      height: 100%;
    }

    > div {
      flex: 1;
      margin: 1rem;
    }
  }

  section {
    border: 1px solid var(--color-neutral90);
    border-radius: 0.4rem;
    width: 100%;
    overflow: auto;

    h3 {
      display: flex;
      align-items: center;
      height: 5.5rem;
      font-weight: 600;
      font-size: 1.4rem;
      padding: 0 2rem;
      border-bottom: inherit;
    }
    & + section {
      margin-top: 1.5rem;
    }
  }

  .btn-wrap {
    display: flex;
    gap: 1.2rem;
    padding: 2.4rem 2.4rem 0;
    margin: 2.4rem -2.4rem 0;
    border-top: 1px solid var(--color-neutral90);
    button {
      flex: 1;
    }
  }

  table {
    img {
      border: 1px solid var(--color-neutral90);
      border-radius: 0.8rem;
      width: 5.6rem;
      height: 5.6rem;
      box-shadow: 0;
    }

    td,
    th {
      vertical-align: middle;
      font-weight: 400;
      text-align: center;

      &:nth-of-type(1) > div {
        display: flex;
        align-items: center;
      }

      img + span {
        margin-left: 1.6rem;
        vertical-align: middle;
      }
    }
  }
`;

const IngredientRow = ({
  data,
  action,
}: {
  data: MaterialInfo;
  action: React.ReactNode;
}) => {
  return (
    <tr>
      <td>
        <div className="">
          <img src={data.material_image ?? ""} />
          <span>{data.material_name_ko}</span>
        </div>
      </td>
      <td>
        <span>{data.pcn_manufacturer}</span>
      </td>
      <td>
        <span>{data.evv_country}</span>
      </td>
      <td>{action}</td>
    </tr>
  );
};

const IngredientSelect = ({ onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<SearchkeywordType>({
    search_target: "material_name_ko",
    search_keyword: "",
  });

  const [selectedIngredientList, setSelectedIngredientList] = useState<
    MaterialInfo[]
  >([]);

  const { data, isIdle } = useQuery(
    ["ingredient-list", params],
    () =>
      fetchCommonMaterialList({
        search_target: params.search_target,
        search_keyword: params.search_keyword,
        current_num: 1,
        per_num: 9999,
      }),
    {
      enabled: open && !!params.search_keyword,
    }
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setSelectedIngredientList([]);
    setParams({
      search_target: "material_name_ko",
      search_keyword: "",
    });
  }, []);

  const handleSelect = React.useCallback(() => {
    onSelect(selectedIngredientList);
    handleClose();
  }, [selectedIngredientList, onSelect]);
  const isSelectedIngredient = React.useCallback(
    (row: MaterialInfo) =>
      !!selectedIngredientList.find(
        (selectedRow) => selectedRow.material_info_idx === row.material_info_idx
      ),
    [selectedIngredientList]
  );

  return (
    <>
      <Button variant="gostSecondary" onClick={() => setOpen(true)}>
        등록하기
      </Button>
      <Modal
        title="원재료 등록"
        showCloseButton
        disabledFormSubmit={selectedIngredientList.length === 0}
        isOpen={open}
        onFormSubmit={handleSelect}
        onClose={handleClose}
      >
        <IngredientModalContent>
          <section className="search">
            <h3>원재료명</h3>
            <SearchKeyword
              params={params}
              handler={({ search_keyword }) =>
                setParams({ ...params, search_keyword })
              }
            />
          </section>
          <section>
            <h3>검색 결과</h3>
            <InnerTable>
              <colgroup>
                <col />
                <col width={120} />
                <col width={120} />
                <col width={120} />
              </colgroup>
              <thead>
                <tr>
                  <th>원재료명</th>
                  <th>거래처명</th>
                  <th>원산지명</th>
                  <th>설정</th>
                </tr>
              </thead>
              <tbody>
                {(data?.list.length === 0 || isIdle) && (
                  <tr>
                    <td colSpan={4}>
                      <Empty>
                        {`검색된 목록이 없습니다.\n상단에서 '원재료명'을 검색해주세요.`}
                      </Empty>
                    </td>
                  </tr>
                )}
                {data?.list.map((row: MaterialInfo) => (
                  <IngredientRow
                    key={data.material_info_idx}
                    data={row}
                    action={
                      <Button
                        variant="gostSecondary"
                        disabled={isSelectedIngredient(row)}
                        style={{ width: "100%", minWidth: "auto" }}
                        onClick={() =>
                          setSelectedIngredientList([
                            ...selectedIngredientList,
                            row,
                          ])
                        }
                      >
                        추가
                      </Button>
                    }
                  />
                ))}
              </tbody>
            </InnerTable>
          </section>
          <section>
            <h3>선택 항목</h3>
            <InnerTable>
              <colgroup>
                <col />
                <col width={120} />
                <col width={120} />
                <col width={120} />
              </colgroup>
              <thead>
                <tr>
                  <th>원재료명</th>
                  <th>거래처명</th>
                  <th>원산지명</th>
                  <th>설정</th>
                </tr>
              </thead>
              <tbody>
                {selectedIngredientList.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <Empty>{`선택한 항목이 없습니다.\n‘검색 결과'에서 항목을 선택해주세요.`}</Empty>
                    </td>
                  </tr>
                )}
                {selectedIngredientList.map((row: MaterialInfo) => (
                  <IngredientRow
                    key={row.material_info_idx}
                    data={row}
                    action={
                      <Button
                        type="button"
                        variant="gostSecondary"
                        style={{ width: "100%", minWidth: "auto" }}
                        onClick={() =>
                          setSelectedIngredientList(
                            selectedIngredientList.filter(
                              (selectedRow) =>
                                selectedRow.material_info_idx !==
                                row.material_info_idx
                            )
                          )
                        }
                      >
                        삭제
                      </Button>
                    }
                  />
                ))}
              </tbody>
            </InnerTable>
          </section>
        </IngredientModalContent>
      </Modal>
    </>
  );
};

export default IngredientSelect;
