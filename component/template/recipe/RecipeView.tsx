import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IEnvironmentResItem } from "InterfaceFarm/environment";
import { IRecipeFormFields } from "InterfaceFarm/product-recipe";
import { FormWrap } from "@ComponentFarm/common";
import TimeSecondInput from "@ComponentFarm/molecule/TimeInput/TimeSecondInput";
import RecipeStepForm from "./RecipeStepForm";
import { RecipeFormStyle, RegisterRecipeWrap } from "./style";

interface RecipeFormProps {
  initialData: IRecipeFormFields;
  envs: IEnvironmentResItem[];
}

const RecipeView = React.forwardRef<HTMLFormElement, RecipeFormProps>(
  ({ initialData, envs }) => {
    const stepRef = React.useRef<HTMLDivElement>(null);

    const methods = useForm<IRecipeFormFields>({
      defaultValues: initialData,
    });

    const {
      control,
      register,
      getValues,
      formState: { errors },
    } = methods;

    return (
      <RegisterRecipeWrap>
        <FormProvider {...methods}>
          <FormWrap css={RecipeFormStyle}>
            <h3>{initialData.recipe_name} 레시피 기본 정보</h3>
            <div className="line line1">
              <div className="field1">
                <label htmlFor="reipce_name" className="req">
                  레시피명
                </label>
                <div className={`box_inp ${errors.recipe_name ? "error" : ""}`}>
                  <input
                    id="reipce_name"
                    type="text"
                    className="inp"
                    {...register("recipe_name")}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="line line2">
              <div className="field2">
                <label htmlFor="reipce_image" className="req">
                  레시피 완성 이미지
                </label>
                <div className="image-wrap">
                  <img
                    src={getValues("recipe_image")}
                    alt={getValues("recipe_name")}
                  />
                </div>
              </div>
              <div className="group">
                <div className="field4">
                  <label htmlFor="time-min" className="req">
                    총 제조 시간
                  </label>
                  <div className="box_inp">
                    <Controller
                      name="recipe_manufacturing_time"
                      defaultValue={0}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TimeSecondInput
                          value={value ?? ""}
                          disabled
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <RecipeStepForm ref={stepRef} editable={false} inView />
          </FormWrap>
        </FormProvider>
      </RegisterRecipeWrap>
    );
  }
);

RecipeView.displayName = "RecipeView";

export default RecipeView;
