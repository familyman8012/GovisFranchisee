import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { removeRecipeStep } from "ApiFarm/product-recipe";
import { IRecipeFormFields } from "InterfaceFarm/product-recipe";
import More from "@ComponentFarm/atom/icons/More";
import { MenuOptionGroupStyle } from "../menu/style";

interface RecipeStepCategoryProps {
  index: number;
  editable?: boolean;
  selectedView?: number;
  onRemoveStep: () => void;
  onSelectStep: (view?: number) => void;
}

const RecipeStepCategory = ({
  index,
  editable,
  selectedView,
  onRemoveStep,
  onSelectStep,
}: RecipeStepCategoryProps) => {
  const { register, getValues, watch, getFieldState, formState } =
    useFormContext<IRecipeFormFields>();

  const recipe_info_idx = watch("recipe_info_idx");
  const product_info_idx = watch("product_info_idx");
  const formKey = `recipe_steps.${index}` as `recipe_steps.${number}`;

  const [canEditName, setCanEditName] = React.useState(
    !getValues(`${formKey}.recipe_step_idx`)
  );

  const [dropDown, setDropDown] = React.useState(false);

  const stepFormData = watch(`${formKey}`);

  useEffect(() => {
    if (!dropDown) return () => {};

    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown")) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [dropDown]);

  const removeStepMutate = useMutation(removeRecipeStep, {
    onSuccess: () => {
      toast.info("레시피 단계가 삭제되었습니다.");
    },
  });

  const { isLoading } = removeStepMutate;

  const checkSaveHandler = useCallback(() => {
    setCanEditName(false);
    onSelectStep(index);
  }, [index]);

  const checkRemoveHandler = useCallback(async () => {
    if (isLoading) return;
    if (!recipe_info_idx || !stepFormData.recipe_step_idx) {
      onRemoveStep();
      return;
    }

    removeStepMutate
      .mutateAsync({
        product_info_idx,
        recipe_info_idx,
        recipe_step_idx: stepFormData.recipe_step_idx,
      })
      .then(onRemoveStep);
  }, [
    product_info_idx,
    recipe_info_idx,
    stepFormData,
    isLoading,
    onRemoveStep,
  ]);

  const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkSaveHandler();
    }
  };

  return (
    <MenuOptionGroupStyle
      className={`option ${selectedView === index ? "active" : ""} ${
        getFieldState(`${formKey}`, formState)?.invalid ? "invalid" : ""
      }`}
    >
      <div
        className={`header ${canEditName ? "editable" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          !isLoading && e.key === "Enter" && onSelectStep(index)
        }
        onClick={() => !isLoading && onSelectStep(index)}
      >
        {canEditName ? (
          <input
            {...register(`${formKey}.recipe_step_name`, {
              required: true,
            })}
            type="text"
            className="inp"
            placeholder="레시피 단계명을 입력해주세요."
            autoComplete="off"
            onKeyDown={handleEnterKeydown}
            onBlur={checkSaveHandler}
          />
        ) : (
          <span className="title">{stepFormData?.recipe_step_name}</span>
        )}
        {canEditName ? (
          <button
            className="save-button"
            type="button"
            onClick={checkSaveHandler}
          >
            저장
          </button>
        ) : (
          <div className="dropdown">
            {editable && (
              <button
                type="button"
                className="icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropDown((val) => !val);
                }}
              >
                <More />
              </button>
            )}
            {dropDown && (
              <div className="dropdown-list">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setDropDown(false);
                    setCanEditName(true);
                  }}
                >
                  편집
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setDropDown(false);
                    checkRemoveHandler();
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MenuOptionGroupStyle>
  );
};

export default RecipeStepCategory;
