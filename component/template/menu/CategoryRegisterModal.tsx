import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createMenuCategory } from "ApiFarm/menu";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import RadioGroup from "@ComponentFarm/modules/RadioGroup/RadioGroup";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import { InnerTable } from "@ComponentFarm/common";
import useFormOptionsWithEnvs from "HookFarm/useFormOptionsWithEnvs";

interface Props {
  show: boolean;
  onClose: () => void;
  onRegister: (id: number) => void;
}

const RegisterModal = ({ show, onClose, onRegister }: Props) => {
  const { menu_category_status } = useFormOptionsWithEnvs([
    "menu_category_status",
  ]);

  const createCategory = useMutation(createMenuCategory, {
    onSuccess: (data) => {
      toast.info("메뉴 카테고리가 등록되었습니다.");
      onRegister(data.menu_category_idx);
    },
  });

  const {
    formState: { errors },
    control,
    register,
    reset,
    handleSubmit,
  } = useForm<{
    menu_category_name: string;
    evi_menu_category_status: string;
  }>({
    defaultValues: {
      menu_category_name: "",
      evi_menu_category_status: menu_category_status[0]?.value,
    },
  });

  useEffect(() => {
    if (!show) {
      reset({
        menu_category_name: "",
        evi_menu_category_status: menu_category_status[0]?.value,
      });
    }
  }, [show]);

  return (
    <Modal
      isOpen={show}
      title="카테고리 등록"
      disabledFormSubmit={createCategory.isLoading}
      onFormSubmit={handleSubmit((formData) =>
        createCategory.mutate({
          ...formData,
          evi_menu_category_status: Number(formData.evi_menu_category_status),
        })
      )}
      showCloseButton
      onClose={onClose ?? (() => {})}
    >
      <InnerTable
        bordered
        style={{
          width: "55rem",
        }}
      >
        <colgroup>
          <col width={157} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>카테고리명</th>
            <td>
              <div
                className={`box_inp ${
                  errors.menu_category_name ? "error" : ""
                }`}
              >
                <input
                  type="text"
                  {...register("menu_category_name", {
                    required: true,
                  })}
                  className="inp"
                />
                <ErrorTxt error={errors.menu_category_name} />
              </div>
            </td>
          </tr>
          <tr>
            <th>카테고리 상태</th>
            <td>
              <Controller
                name="evi_menu_category_status"
                control={control}
                render={({ field: { onChange, value, ref, ...restField } }) => (
                  <RadioGroup
                    defaultValue={`${value}`}
                    onChange={onChange}
                    {...restField}
                    options={menu_category_status}
                  />
                )}
              />
            </td>
          </tr>
        </tbody>
      </InnerTable>
    </Modal>
  );
};

export default RegisterModal;
