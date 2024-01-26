import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { copyMenu } from "ApiFarm/menu";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";
import useFormOptionsWithEnvs from "HookFarm/useFormOptionsWithEnvs";
import { MenuCopyInputStyle } from "./style";

interface Props {
  show: boolean;
  menu_info_idx?: number;
  onClose: () => void;
  onRegister: (menu_info_idx: number) => void;
}

const MenuCopyModal = ({ show, menu_info_idx, onClose, onRegister }: Props) => {
  const { menu_group } = useFormOptionsWithEnvs(["menu_group"]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    menu_name: string;
    evi_menu_group: string;
  }>({
    defaultValues: {
      evi_menu_group: menu_group[0]?.value,
      menu_name: "",
    },
  });

  const menuCopy = useMutation(copyMenu, {
    onSuccess: (data) => {
      onRegister(data.menu_info_idx);
    },
  });

  useEffect(() => {
    if (!show)
      reset({
        evi_menu_group: menu_group[0]?.value,
        menu_name: "",
      });
  }, [show]);

  return (
    <Modal
      isOpen={show}
      title="메뉴 복사"
      showCloseButton
      showCancelButton={false}
      onFormSubmit={handleSubmit((formData) => {
        if (menuCopy.isLoading) return;
        menuCopy.mutate({
          menu_info_idx: menu_info_idx ?? -1,
          ...formData,
        });
      })}
      onClose={onClose ?? (() => {})}
    >
      <MenuCopyInputStyle
        className={`${
          errors.menu_name || errors.evi_menu_group ? "error" : ""
        }`}
      >
        <select
          className="error"
          {...register("evi_menu_group", {
            required: true,
          })}
        >
          {menu_group?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          {...register("menu_name", {
            required: true,
          })}
          type="text"
          className="inp"
        />
      </MenuCopyInputStyle>
      <ErrorTxt error={errors.menu_name || errors.evi_menu_group} />
    </Modal>
  );
};

export default MenuCopyModal;
