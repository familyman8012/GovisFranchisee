/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IRecipeFormFields } from "InterfaceFarm/product-recipe";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Plus from "@ComponentFarm/atom/icons/Plus";
import useFormOptionsWithEnvs from "HookFarm/useFormOptionsWithEnvs";
import RecipeStepCategory from "./RecipeStepCategoryForm";
import RecipeStepDetail from "./RecipeStepDetailForm";
import RecipeStepOrder from "./RecipeStepOrder";
import { MenuOptionListStyle } from "../menu/style";

const RecipeStepForm = React.forwardRef<
  HTMLElement,
  {
    editable?: boolean;
    inView?: boolean;
    onChangeOrder?: () => void;
  }
>(({ editable, inView, onChangeOrder }, ref) => {
  const { control, watch } = useFormContext<IRecipeFormFields>();
  const { append, fields, remove } = useFieldArray<
    IRecipeFormFields,
    "recipe_steps"
  >({
    name: "recipe_steps",
    control,
  });

  const [view, setView] = useState<number | undefined>(undefined);

  const options = useFormOptionsWithEnvs(["recipe_step_topping_type"]);
  const steps = watch("recipe_steps") ?? [];

  return (
    <MenuOptionListStyle ref={ref}>
      <h3>
        레시피 단계별 정보
        {!inView && !editable && (
          <RecipeStepOrder
            recipeSteps={steps}
            onChangeOrder={() => onChangeOrder?.()}
          />
        )}
      </h3>
      <div className="wrap">
        <div className="side">
          {editable && (
            <Button
              size="lg"
              LeadingIcon={<Plus />}
              onClick={() =>
                append({
                  sort_number:
                    steps?.[steps.length - 1]?.sort_number !== undefined
                      ? (steps[steps.length - 1]?.sort_number ?? 0) + 1
                      : steps.length,
                  recipe_step_name: "",
                  recipe_step_description: "",
                  step_manufacturing_time: "0",
                  evi_recipe_step_topping_type:
                    options.recipe_step_topping_type[0]?.value,
                })
              }
            >
              레시피 단계 추가하기
            </Button>
          )}
          <div className="list">
            {fields.map(({ id }, i) => (
              <RecipeStepCategory
                key={id}
                index={i}
                selectedView={view}
                editable={editable}
                onSelectStep={setView}
                onRemoveStep={() => {
                  remove(i);
                  setView(undefined);
                }}
              />
            ))}
          </div>
        </div>
        <div className="view">
          {view === undefined &&
            (steps.length === 0 ? (
              <Empty>
                <b>등록된 정보가 없습니다.</b>
                <br />
                <span className="sub">레시피 단계를 추가해주세요.</span>
              </Empty>
            ) : (
              <Empty>
                <span className="sub">레시피 단계를 선택해주세요.</span>
              </Empty>
            ))}
          {fields?.map((field, i) => (
            <RecipeStepDetail
              key={field.id}
              editable={editable}
              stepIndex={i}
              currentView={view}
              inView={inView}
              onChangeView={setView}
            />
          ))}
        </div>
      </div>
    </MenuOptionListStyle>
  );
});

RecipeStepForm.displayName = "RecipeStepForm";

export default RecipeStepForm;
