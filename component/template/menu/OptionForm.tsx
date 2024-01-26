/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IMenuFormFields } from "InterfaceFarm/menu";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Plus from "@ComponentFarm/atom/icons/Plus";
import MenuOptionCategory from "./OptionCategoryForm";
import MenuOptionDetail from "./OptionDetailForm";
import { MenuOptionListStyle } from "./style";

interface MenuOptionDetailRenderProps {
  currentView?: [number, number];
  groupIndex: number;
  editable?: boolean;
  onChangeView: (view: [number, number] | undefined) => void;
}
const MenuOptionListRender = ({
  editable,
  groupIndex,
  currentView = [-1, -1],
  onChangeView,
}: MenuOptionDetailRenderProps) => {
  const { watch } = useFormContext<IMenuFormFields>();

  const formKey = `menu_categories.${groupIndex}.menu_options` as const;
  const menu_options = watch(`${formKey}`);

  return (
    <>
      {menu_options.map((field, j) => (
        <MenuOptionDetail
          key={field.menu_option_info_idx ? field.menu_option_info_idx : j}
          editable={editable}
          currentView={currentView}
          groupIndex={groupIndex}
          optionIndex={j}
          onChangeView={onChangeView}
        />
      ))}
    </>
  );
};

export const MenuOptionForm = React.forwardRef<
  HTMLElement,
  {
    editable?: boolean;
  }
>(({ editable }, ref) => {
  const { control, watch } = useFormContext<IMenuFormFields>();
  const { append, fields, remove } = useFieldArray<
    IMenuFormFields,
    "menu_categories"
  >({
    name: "menu_categories",
    control,
  });

  watch("menu_categories");
  const [view, setView] = useState<[number, number] | undefined>(undefined);

  return (
    <MenuOptionListStyle ref={ref}>
      <h2>옵션 메뉴 정보</h2>
      <div className="wrap">
        <div className="side">
          {editable && (
            <Button
              disabled={!editable}
              size="lg"
              LeadingIcon={<Plus />}
              onClick={() =>
                append({
                  menu_option_category_name: `${fields.length + 1}`,
                  menu_options: [],
                })
              }
            >
              옵션 분류 추가하기
            </Button>
          )}
          <div className="list">
            {fields.map(({ id }, index) => (
              <MenuOptionCategory
                key={id}
                index={index}
                selectView={view}
                editable={editable}
                onSelectOption={setView}
                onRemoveCategory={() => {
                  remove(index);
                  setView(undefined);
                }}
              />
            ))}
          </div>
        </div>
        <div className="view">
          {!view &&
            (fields.length === 0 ? (
              <Empty>
                <b>등록된 정보가 없습니다.</b>
                <br />
                <span className="sub">옵션을 추가해 주세요.</span>
              </Empty>
            ) : (
              <Empty>
                <span className="sub">옵션을 선택해주세요.</span>
              </Empty>
            ))}
          {fields?.map((field, i) => (
            <MenuOptionListRender
              key={field.id}
              editable={editable}
              groupIndex={i}
              currentView={view}
              onChangeView={setView}
            />
          ))}
        </div>
      </div>
    </MenuOptionListStyle>
  );
});

MenuOptionForm.displayName = "MenuOptionForm";
