import React, { useMemo } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRecipeFormFields } from "InterfaceFarm/product-recipe";
import Editor from "@ComponentFarm/modules/Editor/Editor";
import RadioGroup from "@ComponentFarm/modules/RadioGroup/RadioGroup";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import HtmlViewer from "@ComponentFarm/atom/HtmlViewer/HtmlViewer";
import Ellipse from "@ComponentFarm/atom/icons/Ellipse";
import { InnerTable } from "@ComponentFarm/common";
import IngredientSelect from "@ComponentFarm/molecule/IngredientSelect";
import SelectFileButton from "@ComponentFarm/molecule/SelectFile/SelectFileButton";
import TimeSecondInput from "@ComponentFarm/molecule/TimeInput/TimeSecondInput";
import useFormOptionsWithEnvs from "HookFarm/useFormOptionsWithEnvs";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { getComputedCost } from "@UtilFarm/number";
import RecipeIngredientList from "./RecipeIngredientList";
import { RecipeStepWrap } from "./style";
import { MenuOptionDetailStyle } from "../menu/style";

interface RecipeStepDetailProps {
  editable?: boolean;
  inView?: boolean;
  stepIndex: number;
  currentView?: number;
  onChangeView: (view?: number) => void;
}

const RecipeStepDetail = ({
  editable,
  currentView,
  stepIndex,
  inView,
}: RecipeStepDetailProps) => {
  const { register, control, formState, watch, getValues, setValue } =
    useFormContext<IRecipeFormFields>();

  const options = useFormOptionsWithEnvs([
    "recipe_status",
    "recipe_step_topping_type",
    "recipe_material_meterage_unit",
    "recipe_material_quantity_unit",
  ]);

  const formKey = `recipe_steps.${stepIndex}` as `recipe_steps.${number}`;
  const stepFormData = watch(formKey);

  const { append, remove, fields } = useFieldArray<
    IRecipeFormFields,
    `recipe_steps.${number}.recipe_material_list`
  >({
    name: `${formKey}.recipe_material_list`,
  });

  const isShow = useMemo(
    () => currentView === stepIndex,
    [currentView, stepIndex]
  );

  const errors = useMemo(
    () => formState.errors.recipe_steps?.[stepIndex ?? -1],
    [formState, stepIndex]
  );

  return (
    <MenuOptionDetailStyle style={{ display: isShow ? "" : "none" }}>
      <RecipeStepWrap>
        <section>
          <h3>기본 정보</h3>
          <InnerTable bordered fullWidth>
            <colgroup>
              <col width={getTableWidthPercentage(252, 1252)} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th className="req">토핑 종류</th>
                <td>
                  <Controller
                    name={`${formKey}.evi_recipe_step_topping_type`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup
                        disabled={!editable}
                        defaultValue={value?.toString()}
                        options={options.recipe_step_topping_type}
                        onChange={onChange}
                      />
                    )}
                  />
                </td>
              </tr>
              <tr>
                <th className="req">토핑 완성 이미지</th>
                <td>
                  {editable ? (
                    <div
                      className={`box_inp ${
                        errors?.topping_image ? "error" : ""
                      }`}
                    >
                      <input
                        type="hidden"
                        {...register(`${formKey}.topping_image`)}
                      />
                      <SelectFileButton
                        {...register(`${formKey}.initial_topping_image`)}
                        src={stepFormData.topping_image}
                        onRemove={() =>
                          setValue(`${formKey}.topping_image`, "")
                        }
                      />
                      <ErrorTxt error={errors?.initial_topping_image} />
                    </div>
                  ) : (
                    <div className="image-wrap">
                      {stepFormData.topping_image && (
                        <img
                          src={stepFormData.topping_image}
                          alt={stepFormData.recipe_step_name}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th className="req">평균 제조 시간</th>
                <td>
                  <div
                    className={`box_inp ${
                      errors?.step_manufacturing_time ? "error" : ""
                    }`}
                  >
                    <Controller
                      control={control}
                      name={`${formKey}.step_manufacturing_time`}
                      defaultValue={0}
                      rules={{
                        validate: (val) =>
                          !val ||
                          (typeof val === "string" ? parseInt(val, 10) : val) >
                            0 ||
                          "총 제조 시간은 0보다 커야합니다.",
                      }}
                      render={({ field: { value, onChange } }) => (
                        <TimeSecondInput
                          value={value ?? ""}
                          disabled={!editable}
                          onChange={(val) => onChange(parseInt(val, 10))}
                        />
                      )}
                    />
                    <ErrorTxt error={errors?.step_manufacturing_time} />
                  </div>
                </td>
              </tr>
            </tbody>
          </InnerTable>
        </section>
        <section>
          <h3>원재료 정보</h3>
          <div className={`ingredient-table-wrap ${inView ? "in-view" : ""}`}>
            {editable && (
              <div className="ingredient-buttons">
                <IngredientSelect
                  onSelect={(selectedItems) => {
                    append(
                      selectedItems.map((item) => ({
                        recipe_material_idx: 0,
                        material_image: item.material_image,
                        material_name_ko: item.material_name_ko,
                        material_info_idx: item.material_info_idx,
                        evi_recipe_material_meterage_unit:
                          options.recipe_material_meterage_unit[0]?.value,
                        evi_recipe_material_quantity_unit:
                          options.recipe_material_quantity_unit[1]?.value,
                        evv_country: item.evv_country,
                        pcn_manufacturer: item.pcn_manufacturer,
                        recipe_material_meterage_value: 0,
                        recipe_material_quantity_value: 0,
                        recipe_material_note: "",
                      }))
                    );
                  }}
                />
              </div>
            )}

            {inView ? (
              <RecipeIngredientList ingredients={fields} />
            ) : (
              <InnerTable fullWidth>
                <colgroup>
                  {editable && (
                    <col width={getTableWidthPercentage(48, 1181)} />
                  )}
                  <col width={getTableWidthPercentage(502, 1181)} />
                  <col width={getTableWidthPercentage(248, 1181)} />
                  <col width={getTableWidthPercentage(248, 1181)} />
                  <col width={getTableWidthPercentage(200, 1181)} />
                </colgroup>
                <thead>
                  <tr>
                    {editable && <td>&nbsp;</td>}
                    <td>원재료명</td>
                    <td>투입량</td>
                    <td>계량 정보</td>
                    <td>비고</td>
                  </tr>
                </thead>
                <tbody>
                  {fields.length === 0 && (
                    <tr>
                      <td colSpan={5}>
                        <Empty>원재료를 선택해주세요.</Empty>
                      </td>
                    </tr>
                  )}
                  {fields.map((field, i) => (
                    <tr key={field.id}>
                      {editable && (
                        <td className="center">
                          <Ellipse
                            className="ingredient-remove"
                            onClick={() => remove(i)}
                          />

                          <input
                            type="hidden"
                            {...register(
                              `${formKey}.recipe_material_list.${i}.recipe_material_idx`
                            )}
                          />
                        </td>
                      )}
                      <td>
                        <div className="ingredient-info">
                          {field.material_image && (
                            <div className="img">
                              <img
                                src={field.material_image}
                                alt={field.material_name_ko}
                              />
                            </div>
                          )}
                          <div className="info">
                            {field.material_name_ko}
                            <br />
                            <span className="tag">
                              {field.pcn_manufacturer}
                            </span>
                            <span className="tag">
                              {field.evv_country?.[0]}
                            </span>
                            {!editable && (
                              <>
                                <br />
                                <span>
                                  {`매입 원가 ${getComputedCost(
                                    field.purchase_cost,
                                    getValues(
                                      `${formKey}.recipe_material_list.${i}.recipe_material_quantity_value`
                                    ) ?? 0
                                  )}원 | 판매 원가 ${getComputedCost(
                                    field.sale_cost,
                                    getValues(
                                      `${formKey}.recipe_material_list.${i}.recipe_material_quantity_value`
                                    ) ?? 0
                                  )}원`}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* {!editable && (
                        <>
                          <td className="computed-cost">
                            {getComputedCost(
                              field.purchase_cost,
                              getValues(
                                `${formKey}.recipe_material_list.${i}.recipe_material_quantity_value`
                              )
                            )}
                          </td>
                          <td className="computed-cost">
                            {getComputedCost(
                              field.sale_cost,
                              getValues(
                                `${formKey}.recipe_material_list.${i}.recipe_material_quantity_value`
                              )
                            )}
                          </td>
                        </>
                      )} */}
                      <td>
                        <div className="box_inp">
                          <select
                            {...register(
                              `${formKey}.recipe_material_list.${i}.evi_recipe_material_quantity_unit`,
                              { valueAsNumber: true }
                            )}
                            disabled={!editable}
                          >
                            {options.recipe_material_quantity_unit.map(
                              (item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              )
                            )}
                          </select>
                          <input
                            {...register(
                              `${formKey}.recipe_material_list.${i}.recipe_material_quantity_value`,
                              { valueAsNumber: true }
                            )}
                            disabled={!editable}
                            className="inp"
                            placeholder="수량"
                          />
                        </div>
                        <ErrorTxt />
                      </td>
                      <td>
                        <div className="box_inp">
                          <select
                            {...register(
                              `${formKey}.recipe_material_list.${i}.evi_recipe_material_meterage_unit`,
                              { valueAsNumber: true }
                            )}
                            disabled={!editable}
                          >
                            {options.recipe_material_meterage_unit.map(
                              (item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              )
                            )}
                          </select>
                          <input
                            {...register(
                              `${formKey}.recipe_material_list.${i}.recipe_material_meterage_value`,
                              { valueAsNumber: true }
                            )}
                            disabled={!editable}
                            className="inp"
                            placeholder="수량"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="box_inp">
                          <input
                            {...register(
                              `${formKey}.recipe_material_list.${i}.recipe_material_note`
                            )}
                            disabled={!editable}
                            className="inp"
                            placeholder="비고"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </InnerTable>
            )}
          </div>
        </section>
        <section>
          <h3>레시피 설명</h3>
          {editable ? (
            <Controller
              name={`${formKey}.recipe_step_description`}
              render={({ field: { onChange, value } }) => (
                <Editor value={value} onChange={onChange} />
              )}
            />
          ) : (
            <HtmlViewer
              className="recipe-desc"
              html={stepFormData.recipe_step_description}
            />
          )}
        </section>
      </RecipeStepWrap>
    </MenuOptionDetailStyle>
  );
};

export default RecipeStepDetail;
