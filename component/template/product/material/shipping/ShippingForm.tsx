import React, { useEffect, useState } from "react";
import { runInAction } from "mobx";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { IEnvironmentResItem } from "InterfaceFarm/environment";
import { IMaterialShippingSaveReq, IPartnerRes } from "InterfaceFarm/material";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { Minus } from "@ComponentFarm/atom/icons";
import { IOption, Select } from "@ComponentFarm/atom/Select/Select";
import { FormWrap, Table, TableWrap } from "@ComponentFarm/common";
import PageLayout from "@ComponentFarm/layout/PageLayout";
import {
  convertServerFormat,
  convertToLabelValueFormat,
} from "@ComponentFarm/template/product/material/shipping/convertShipping";
import { confirmModalStore } from "MobxFarm/store";
import { convertEnv } from "@UtilFarm/convertEnvironment";
import { settingsByMode } from "./const";
import { tabDataFunc } from "../const";

type FormFields = {
  [key: string]: string;
};

interface FormProps {
  initialData?: FormFields;
  isSubmitLoading: boolean;
  pageMode: string;
  shippingListData: IPartnerRes;
  area: IEnvironmentResItem[];
  submitFunc: (data: {
    params: string;
    data: IMaterialShippingSaveReq;
  }) => void;
}

const productStyles = css`
  table label {
    width: auto !important;
  }

  .line1 .field1 {
    label {
      width: 13rem;
    }
    .box_inp {
      display: flex;

      .select_library_control {
        width: 37.2rem;
        height: 4.4rem;
      }

      button {
        min-width: auto;
        width: 5.7rem;
        margin-left: 1.1rem;
      }
    }
  }

  table {
    width: 100%;
    background-color: rgba(247, 249, 252, 0.8);
    .line {
      margin-top: 0;
    }
    thead th {
      display: flex;
      align-items: center;
      height: 6.6rem;
      padding: 1.1rem 2rem;
      border-bottom: none;

      button {
        min-width: auto;
        margin-right: 1.6rem;
        padding: 1.2rem 1.6rem;
        background: #fff;
      }
    }
    tbody {
      .line td {
        &.td_label {
          display: flex;
          align-items: center;
          width: calc(120 / 1517 * 100%);
          padding: 0.8rem 0 0.8rem 2rem;
          border-right: 1px solid var(--color-neutral90);
          label.req {
            margin-bottom: 0;
            &:after {
              display: none;
            }
          }
        }
        &.td_inp {
          width: calc(133 / 1517 * 100%);
          padding: 0.8rem 1rem 0.8rem;
          background: #fff;
          .box_inp {
            display: flex;
            justify-content: center;
            width: auto;
          }
          .inp {
            width: calc(80 / 130 * 100%);
            margin-right: 0.4rem;
            padding: 0.8rem 1.2rem;
          }
        }
      }
    }
  }
`;

const ShippingForm: React.FC<FormProps> = ({
  initialData,
  isSubmitLoading,
  pageMode,
  shippingListData,
  area,
  submitFunc,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const tabData = tabDataFunc("shipping", pageMode, router?.query);
  const isReadOnly = pageMode === "view";
  const [tables, setTables] = useState<Array<string>>([]);
  const [selValue, setSelValue] = useState<IOption | null>(null);

  const regions = convertEnv("area");
  const selOption = convertToLabelValueFormat(shippingListData.list);

  const {
    handleSubmit,
    register,
    unregister,
    setValue,
    formState: { errors },
  } = useForm();

  const addDeliveryMethod = (method: string | undefined) => {
    if (method && !tables.includes(method)) {
      setTables((prevTables) => [...prevTables, method]);
    }
  };

  const removeDeliveryMethod = (method: string) => {
    setTables((prevTables) =>
      prevTables.filter((tableMethod) => tableMethod !== method)
    );

    // 해당 테이블의 모든 관련 항목들을 제거
    regions.forEach((region) => {
      unregister(`${method}_${region.value}`);
      if (initialData) {
        delete initialData[`${method}_${region.value}`];
      }
    });
  };

  useEffect(() => {
    if (initialData) {
      const deliveryMethods = new Set(
        Object.keys(initialData).map((key) => key.split("_")[0])
      );
      setTables([...deliveryMethods]);
    }
  }, [initialData]);

  useEffect(() => {
    if (
      (pageMode === "view" && initialData) ||
      (pageMode === "modify" && initialData)
    ) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue, pageMode]);

  const removetTableModal = (method: string) => {
    runInAction(() => {
      confirmModalStore.openModal({
        title: "물류사 정보 삭제",
        content: (
          <p>
            확인 버튼을 누르면 선택한 정보가 삭제됩니다.
            <br />
            삭제하시겠습니까?
          </p>
        ),
        onFormSubmit: () => {
          removeDeliveryMethod(method);
          confirmModalStore.isOpen = false;
        },
        onCancel: () => {
          confirmModalStore.isOpen = false;
        },
        submitButtonText: "확인",
        cancelButtonText: "취소",
      });
    });
  };

  const onFormSubmit = handleSubmit((data) => {
    if (isSubmitLoading) return;

    submitFunc({
      params: String(id && id[1]),
      data: convertServerFormat(data, selOption),
    });
  });

  const onSubmit = () => {
    if (pageMode !== "view") {
      onFormSubmit();
    } else {
      router.push({
        pathname: `/material/shipping/modify/${
          router.query.id !== undefined && router.query.id[1]
        }`,
        query: router.query,
      });
    }
  };

  // 현재 mode에 따른 설정 가져오기
  const currentSettings = settingsByMode[pageMode];

  return (
    <PageLayout
      tabData={tabData}
      currentSettings={currentSettings}
      isSubmitLoading={isSubmitLoading}
      onSubmit={onSubmit}
    >
      <FormWrap onSubmit={onFormSubmit} css={productStyles}>
        {pageMode !== "view" && (
          <>
            <h2>배송 정보</h2>
            <div className="line line1">
              <div className="field field1">
                <label htmlFor="method">배송방식</label>
                <div className="box_inp">
                  <Select
                    options={selOption}
                    selectedOption={selValue}
                    setSelectedOption={setSelValue}
                  />
                  <Button
                    onClick={() => addDeliveryMethod(String(selValue?.value))}
                  >
                    추가
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {pageMode !== "view" ? (
          tables.length > 0 && <h2>배송 기간 입력</h2>
        ) : (
          <h2>배송 기간</h2>
        )}
        {tables.length === 0 && pageMode === "view" ? (
          <Empty Icon={<IoAlertCircleOutline size={42} />}>
            배송정보가 등록되지 않았습니다.
            <br />
            배송정보를 등록해주세요.
          </Empty>
        ) : (
          tables.map((method) => (
            <React.Fragment key={method}>
              <TableWrap
                css={css`
                  margin-bottom: 3.2rem;
                `}
              >
                <Table>
                  <thead>
                    <tr>
                      <th colSpan={12}>
                        {pageMode !== "view" && (
                          <Button
                            className="btn_remove"
                            onClick={() => removetTableModal(method)}
                            variant="gostSecondary"
                            IconOnly={<Minus />}
                          >
                            <span className="hiddenZoneV">삭제</span>
                          </Button>
                        )}
                        {selOption?.find(
                          (item) => String(item.value) === String(method)
                        )?.label || ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.ceil(regions.length / 6) }).map(
                      (_, rowIndex) => (
                        <tr
                          className={`line line${rowIndex + 2}`}
                          // eslint-disable-next-line react/no-array-index-key
                          key={rowIndex}
                        >
                          {regions
                            .slice(rowIndex * 6, rowIndex * 6 + 6)
                            .map((region, colIndex) => (
                              <React.Fragment key={region.label}>
                                <td className="td_label">
                                  <label htmlFor={region.value} className="req">
                                    {region.label}
                                  </label>
                                </td>
                                <td className="td_inp">
                                  <div
                                    className={`box_inp ${
                                      errors[`${method}_${region.value}`]
                                        ? "error"
                                        : ""
                                    }`}
                                  >
                                    <input
                                      type="text"
                                      id={`${method}_${region.value}`}
                                      className="inp"
                                      placeholder="0"
                                      disabled={isReadOnly}
                                      {...register(`${method}_${region.value}`)}
                                    />
                                    일
                                    {errors[`${method}_${region.value}`] && (
                                      <ErrorTxt>
                                        {String(
                                          errors[`${method}_${region.value}`]
                                            ?.message
                                        )}
                                      </ErrorTxt>
                                    )}
                                  </div>
                                </td>
                                {rowIndex ===
                                  Math.ceil(regions.length / 6) - 1 &&
                                  colIndex === 4 && (
                                    <td
                                      colSpan={2}
                                      style={{
                                        width: "calc(253 / 1517 * 100%)",
                                      }}
                                    >
                                      <span className="hiddenZoneV" />
                                    </td>
                                  )}
                              </React.Fragment>
                            ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </TableWrap>
            </React.Fragment>
          ))
        )}
      </FormWrap>
    </PageLayout>
  );
};

export default ShippingForm;
