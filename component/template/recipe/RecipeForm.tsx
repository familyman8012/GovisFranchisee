import React, { useEffect, useMemo } from "react";
import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { fetchRecipe } from "ApiFarm/product-recipe";
import { IRecipeFormFields } from "InterfaceFarm/product-recipe";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { FormWrap } from "@ComponentFarm/common";
import SelectFile from "@ComponentFarm/molecule/SelectFile/SelectFile";
import TimeSecondInput from "@ComponentFarm/molecule/TimeInput/TimeSecondInput";
import RecipeStepForm from "./RecipeStepForm";
import { RecipeFormStyle } from "./style";

interface RecipeFormProps {
  productId: number; // 제품 아이디
  recipeId?: number; // 레시피 아이디
  editable?: boolean;
  onSubmit: (formData: IRecipeFormFields) => void;
}

const RecipeForm = React.forwardRef<HTMLFormElement, RecipeFormProps>(
  ({ recipeId, productId, editable = true, onSubmit }, formRef) => {
    const stepRef = React.useRef<HTMLDivElement>(null);
    const fetchDefaultValue = React.useCallback(() => {
      return fetchRecipe({
        product_info_idx: productId,
        recipe_info_idx: recipeId ?? -1,
      }).then((res) => ({ ...res, product_info_idx: productId }));
    }, []);

    const methods = useForm<IRecipeFormFields>({
      defaultValues: useMemo(
        () => ({
          product_info_idx: productId,
          recipe_name: "",
          recipe_image: "",
          recipe_manufacturing_time: "",
          recipe_steps: [],
        }),
        []
      ),
    });

    const {
      control,
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
    } = methods;

    useEffect(() => {
      if (!editable && recipeId) {
        fetchDefaultValue().then(reset);
      }
    }, [editable, recipeId]);

    const handleValidateError = React.useCallback((error: FieldErrors) => {
      if (Object.keys(error).length === 1 && error.recipe_steps) {
        stepRef?.current?.scrollIntoView();
        toast.error("레시피 단계 정보를 확인해주세요.");
      }
    }, []);

    return (
      <FormProvider {...methods}>
        <form
          ref={formRef}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit, handleValidateError)}
        >
          <FormWrap css={RecipeFormStyle}>
            <h3>레시피 기본 정보</h3>
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
                    {...register("recipe_name", {
                      required: true,
                    })}
                    disabled={!editable}
                  />
                  <ErrorTxt error={errors.recipe_name} />
                </div>
              </div>
            </div>
            <div className="line line2">
              <div className="field2">
                <label htmlFor="reipce_image" className="req">
                  레시피 완성 이미지
                </label>
                {editable ? (
                  <div
                    className={`box_inp ${
                      errors.initial_recipe_image ? "error" : ""
                    }`}
                  >
                    <SelectFile
                      {...register("initial_recipe_image")}
                      src={getValues("recipe_image")}
                    />
                    <ErrorTxt error={errors.initial_recipe_image} />
                  </div>
                ) : (
                  <div className="image-wrap">
                    {getValues("recipe_image") && (
                      <img
                        src={getValues("recipe_image")}
                        alt={getValues("recipe_name")}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="group">
                <div className="field4">
                  <label htmlFor="time-min" className="req">
                    총 제조 시간
                  </label>
                  <div
                    className={`box_inp ${
                      errors.recipe_manufacturing_time ? "error" : ""
                    }`}
                  >
                    <Controller
                      name="recipe_manufacturing_time"
                      defaultValue={0}
                      rules={{
                        validate: (val) =>
                          !val ||
                          (typeof val === "string" ? parseInt(val, 10) : val) >
                            0 ||
                          "총 제조 시간은 0보다 커야합니다.",
                      }}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TimeSecondInput
                          disabled={!editable}
                          value={value ?? ""}
                          onChange={onChange}
                        />
                      )}
                    />
                    <ErrorTxt error={errors.recipe_manufacturing_time} />
                  </div>
                </div>
                {!editable && (
                  <>
                    <div className="field">
                      <label htmlFor="created_date">등록일</label>
                      <span>{getValues("created_date") ?? "-"}</span>
                    </div>
                    <div className="field">
                      <label htmlFor="updated_date">수정일</label>
                      <span>{getValues("created_date") ?? "-"}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <RecipeStepForm
              ref={stepRef}
              editable={editable}
              onChangeOrder={() => fetchDefaultValue().then(reset)}
            />
          </FormWrap>
        </form>
      </FormProvider>
    );
  }
);

RecipeForm.displayName = "RecipeForm";

export default RecipeForm;
