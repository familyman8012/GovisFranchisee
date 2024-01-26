import React, { useCallback, useMemo } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  createMenuOptionInfo,
  fetchMenuOptionInfo,
  removeMenuOptionInfo,
  updateMenuOptionInfo,
} from "ApiFarm/menu";
import { IMenuFormFields } from "InterfaceFarm/menu";
import { Button } from "@ComponentFarm/atom/Button/Button";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { InnerTable } from "@ComponentFarm/common";
import { ProductSelect } from "@ComponentFarm/molecule/ProductSelect";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { MenuOptionDetailStyle } from "./style";

interface MenuOptionGroupProps {
  editable?: boolean;
  currentView: [number, number];
  groupIndex: number;
  optionIndex: number;
  onChangeView: (view?: [number, number]) => void;
}

const MenuOptionDetail = ({
  editable,
  currentView,
  groupIndex,
  optionIndex,
  onChangeView,
}: MenuOptionGroupProps) => {
  const { register, control, setValue, formState, trigger, watch } =
    useFormContext<IMenuFormFields>();

  const { remove } = useFieldArray({
    name: `menu_categories.${groupIndex}.menu_options`,
    control,
  });

  const formKey =
    `menu_categories.${groupIndex}.menu_options.${optionIndex}` as `menu_categories.${number}.menu_options.${number}`;
  const infoFormData = watch(formKey);

  const menu_option_info_idx = useMemo(
    () => infoFormData.menu_option_info_idx,
    [infoFormData]
  );

  const isShow = useMemo(
    () => currentView[0] === groupIndex && currentView[1] === optionIndex,
    [currentView, groupIndex, optionIndex]
  );

  const canUpdateOptionInfo = useMemo(
    () =>
      !!(infoFormData.menu_info_idx && infoFormData.menu_option_category_idx),
    [infoFormData]
  );

  const errors = useMemo(
    () =>
      formState.errors.menu_categories?.[groupIndex]?.menu_options?.[
        optionIndex
      ],
    [formState, groupIndex, optionIndex]
  );

  useQuery(
    ["menu-option-info", menu_option_info_idx],
    () => fetchMenuOptionInfo(menu_option_info_idx ?? -1),
    {
      enabled: isShow && !!menu_option_info_idx,
      onSuccess: (data) => setValue(formKey, data),
    }
  );

  const updateOptionInfo = useMutation(updateMenuOptionInfo, {
    onSuccess: () => {
      toast.info("옵션 정보가 수정되었습니다.");
    },
  });

  const createOptionInfo = useMutation(createMenuOptionInfo, {
    onSuccess: (data) => {
      toast.info("옵션 정보가 저장되었습니다.");
      setValue(`${formKey}.menu_option_info_idx`, data.menu_option_info_idx, {
        shouldValidate: true,
      });
    },
  });

  const removeOptionInfo = useMutation(removeMenuOptionInfo, {
    onSuccess: () => {
      toast.info("옵션 정보가 삭제되었습니다.");
    },
  });

  const handleUpdateOptionInfo = useCallback(async () => {
    const isValid = await trigger([
      `${formKey}.menu_option_name`,
      `${formKey}.product_info_idx`,
    ]);

    if (!isValid) return;

    const { menu_option_info_idx: idx } = infoFormData;

    if (idx) {
      updateOptionInfo.mutate({
        menu_option_info_idx: idx,
        ...infoFormData,
      });
    } else {
      createOptionInfo.mutate({
        menu_info_idx: infoFormData?.menu_info_idx ?? -1,
        menu_option_category_idx: infoFormData?.menu_option_category_idx ?? -1,
        ...infoFormData,
      });
    }
  }, [infoFormData]);

  const handleRemoveOptionInfo = useCallback(async () => {
    if (!menu_option_info_idx) {
      remove(optionIndex);
      onChangeView(undefined);
      return;
    }

    await removeOptionInfo.mutateAsync(menu_option_info_idx);
    remove(optionIndex);
    onChangeView(undefined);
  }, [menu_option_info_idx, optionIndex]);

  return (
    <MenuOptionDetailStyle style={{ display: isShow ? "" : "none" }}>
      <div className="header">
        <div
          className={`box_inp ${
            errors?.menu_option_name || errors?.menu_option_info_idx
              ? "error"
              : ""
          }`}
        >
          <input
            {...register(`${formKey}.menu_option_name`, {
              required: true,
            })}
            disabled={!editable}
            className="inp"
            placeholder="메뉴명을 입력해주세요"
          />
          <input
            type="hidden"
            {...register(`${formKey}.menu_option_info_idx`, {
              validate: (value) => {
                if (!value && canUpdateOptionInfo) {
                  return "저장 버튼을 눌러 옵션 정보를 저장해주세요.";
                }
                return true;
              },
            })}
          />
          <ErrorTxt
            error={errors?.menu_option_name || errors?.menu_option_info_idx}
          />
        </div>

        {!!editable && (
          <div className="buttons">
            {canUpdateOptionInfo && (
              <Button
                variant="gostSecondary"
                disabled={
                  updateOptionInfo.isLoading || createOptionInfo.isLoading
                }
                onClick={handleUpdateOptionInfo}
              >
                저장
              </Button>
            )}
            <Button
              variant="gostSecondary"
              disabled={removeOptionInfo.isLoading}
              onClick={handleRemoveOptionInfo}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      <InnerTable fullWidth bordered>
        <colgroup>
          <col width={getTableWidthPercentage(220, 1181)} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <label htmlFor={`${formKey}.product_info_idx`} className="req">
                제품
              </label>
            </td>
            <td>
              <div className="field4">
                <div
                  className={`box_inp ${
                    errors?.product_info_idx ? "error" : ""
                  }`}
                >
                  <input
                    type="hidden"
                    {...register(`${formKey}.product_info_idx`, {
                      required: !infoFormData.menu_option_info_idx,
                    })}
                    disabled={!editable}
                  />
                  <Controller
                    name={`${formKey}.product_name_ko`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <ProductSelect
                        disabled={!editable}
                        value={value ?? ""}
                        onSelect={(item) => {
                          setValue(
                            `${formKey}.product_info_idx`,
                            item.product_info_idx,
                            {
                              shouldValidate: true,
                            }
                          );
                          onChange(item.product_name_ko);
                        }}
                        placeholder="제품 선택"
                      />
                    )}
                  />
                  <ErrorTxt error={errors?.product_info_idx} />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor={`${formKey}.visit_normal_price`} className="req">
                내점 가격
              </label>
            </td>
            <td>
              <div className="field5">
                <div className="box_inp">
                  <div className="price">
                    <span>정상가</span>
                    <input
                      {...register(`${formKey}.visit_normal_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                  <div className="price">
                    <span>할인가</span>
                    <input
                      {...register(`${formKey}.visit_discount_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                htmlFor={`${formKey}.takeout_normal_price`}
                className="req"
              >
                포장 가격
              </label>
            </td>
            <td>
              <div className="field5">
                <div className="box_inp">
                  <div className="price">
                    <span>정상가</span>
                    <input
                      {...register(`${formKey}.takeout_normal_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                  <div className="price">
                    <span>할인가</span>
                    <input
                      {...register(`${formKey}.takeout_discount_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                htmlFor={`${formKey}.delivery_normal_price`}
                className="req"
              >
                배달 가격
              </label>
            </td>
            <td>
              <div className="field5">
                <div className="box_inp">
                  <div className="price">
                    <span>정상가</span>
                    <input
                      {...register(`${formKey}.delivery_normal_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                  <div className="price">
                    <span>할인가</span>
                    <input
                      {...register(`${formKey}.delivery_discount_price`, {
                        required: !infoFormData.menu_option_info_idx,
                      })}
                      disabled={!editable}
                      className="inp"
                      type="text"
                    />
                    <span>원(KRW)</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </InnerTable>
    </MenuOptionDetailStyle>
  );
};

export default MenuOptionDetail;
