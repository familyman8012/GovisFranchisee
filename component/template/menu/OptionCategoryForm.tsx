import React, { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { runInAction } from "mobx";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import {
  createMenuOptionCategory,
  removeMenuOptionCategory,
  updateMenuOptionCategory,
} from "ApiFarm/menu";
import { IMenuFormFields } from "InterfaceFarm/menu";
import { Button } from "@ComponentFarm/atom/Button/Button";
import More from "@ComponentFarm/atom/icons/More";
import Plus from "@ComponentFarm/atom/icons/Plus";
import Up from "@ComponentFarm/atom/icons/Up";
import { confirmModalStore } from "MobxFarm/store";
import { MenuOptionGroupStyle } from "./style";

interface MenuOptionGroupProps {
  index: number;
  editable?: boolean;
  selectView?: [number, number];
  onRemoveCategory: () => void;
  onSelectOption: (view?: [number, number]) => void;
}

const MenuOptionCategory = ({
  index,
  selectView,
  editable,
  onRemoveCategory,
  onSelectOption,
}: MenuOptionGroupProps) => {
  const {
    control,
    register,
    getValues,
    watch,
    getFieldState,
    setValue,
    formState,
  } = useFormContext<IMenuFormFields>();

  const menu_info_idx = watch("menu_info_idx");
  const formKey = `menu_categories.${index}` as `menu_categories.${number}`;

  const [canEditName, setCanEditName] = React.useState(
    !getValues(`${formKey}.menu_option_category_idx`)
  );
  const [dropDown, setDropDown] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const categoryFormData = watch(`${formKey}`);

  const { append } = useFieldArray<
    IMenuFormFields,
    `menu_categories.${number}.menu_options`
  >({
    control,
    name: `${formKey}.menu_options`,
  });

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

  const createMenuCategory = useMutation(createMenuOptionCategory, {
    onSuccess: (data) => {
      toast.info("옵션 분류가 생성되었습니다.");
      setValue(
        `${formKey}.menu_option_category_idx`,
        data.menu_option_category_idx
      );
      setCanEditName(false);
    },
  });

  const updateMenuCategory = useMutation(updateMenuOptionCategory, {
    onSuccess: () => {
      toast.info("옵션 분류가 수정되었습니다.");
      setCanEditName(false);
    },
  });

  const removeMenuCategory = useMutation(removeMenuOptionCategory, {
    onSuccess: () => {
      toast.info("옵션 분류가 삭제되었습니다.");
      onRemoveCategory();
    },
  });

  const isLoading =
    createMenuCategory.isLoading || updateMenuCategory.isLoading;

  const checkCreateOptionInfoHandler = useCallback(async () => {
    const { menu_option_category_idx } = categoryFormData;

    const defaultFormData = {
      menu_option_name: "",
      delivery_discount_price: 0,
      delivery_normal_price: 0,
      takeout_discount_price: 0,
      takeout_normal_price: 0,
      visit_discount_price: 0,
      visit_normal_price: 0,
    };

    if (menu_option_category_idx && menu_info_idx) {
      append({
        ...defaultFormData,
        menu_info_idx,
        menu_option_category_idx,
      });
    } else {
      append(defaultFormData);
    }

    onSelectOption([index, categoryFormData.menu_options.length - 1]);
  }, [onSelectOption, categoryFormData, index]);

  const checkSaveHandler = useCallback(() => {
    if (isLoading) return;
    if (!menu_info_idx) {
      setCanEditName(false);
      checkCreateOptionInfoHandler();
      return;
    }

    if (categoryFormData.menu_option_category_idx) {
      updateMenuCategory.mutate({
        menu_option_category_idx: categoryFormData.menu_option_category_idx,
        menu_option_category_name: categoryFormData.menu_option_category_name,
      });
    } else {
      createMenuCategory
        .mutateAsync({
          menu_info_idx: menu_info_idx ?? -1,
          menu_option_category_name: categoryFormData.menu_option_category_name,
        })
        .then(checkCreateOptionInfoHandler);
    }
  }, [
    categoryFormData,
    menu_info_idx,
    isLoading,
    checkCreateOptionInfoHandler,
  ]);

  const checkRemoveHandler = useCallback(async () => {
    if (isLoading) return;
    if (!menu_info_idx || !categoryFormData.menu_option_category_idx) {
      onRemoveCategory();
      return;
    }

    removeMenuCategory.mutate(categoryFormData.menu_option_category_idx ?? -1);
  }, [categoryFormData, menu_info_idx, isLoading, onRemoveCategory]);

  const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkSaveHandler();
    }
  };

  const canCreateOptionInfo =
    !menu_info_idx || !!categoryFormData?.menu_option_category_idx;

  return (
    <MenuOptionGroupStyle>
      <div className={`header ${canEditName ? "editable" : ""}`}>
        {canEditName ? (
          <input
            type="text"
            {...register(`${formKey}.menu_option_category_name`)}
            className="inp"
            placeholder="옵션 분류명을 입력해 주세요."
            autoComplete="off"
            onKeyDown={handleEnterKeydown}
          />
        ) : (
          <span className="title">
            {categoryFormData?.menu_option_category_name}
          </span>
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
          <>
            <div className="dropdown">
              {editable && (
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setDropDown((val) => !val)}
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
                      runInAction(() => {
                        confirmModalStore.openModal({
                          title: "옵션 삭제",
                          content: <p>옵션 항목을 삭제하시겠습니까?</p>,
                          onFormSubmit: () => {
                            checkRemoveHandler();
                            confirmModalStore.isOpen = false;
                          },
                          onCancel: () => {
                            confirmModalStore.isOpen = false;
                          },
                        });
                      });
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className={`icon-btn ${expanded ? "expanded" : ""}`}
              onClick={() => setExpanded((val) => !val)}
            >
              <Up />
            </button>
          </>
        )}
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="content"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto" },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {categoryFormData.menu_options.map((field, j) => (
              <button
                key={`${j + j}`}
                className={`option ${
                  selectView?.[0] === index && selectView?.[1] === j
                    ? "active"
                    : ""
                }
            ${
              getFieldState(`${formKey}.menu_options.${j}`, formState)?.invalid
                ? "invalid"
                : ""
            }
            `}
                type="button"
                onClick={() => onSelectOption([index, j])}
              >
                {categoryFormData.menu_options[j]?.menu_option_name
                  ? getValues(`${formKey}.menu_options.${j}.menu_option_name`)
                  : "메뉴명을 입력해주세요"}
              </button>
            ))}
            {editable && !canEditName && (
              <Button
                className="add-button"
                disabled={!canCreateOptionInfo}
                variant="transparent"
                LeadingIcon={<Plus />}
                onClick={() => checkCreateOptionInfoHandler()}
              >
                메뉴 추가하기
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MenuOptionGroupStyle>
  );
};

export default MenuOptionCategory;
