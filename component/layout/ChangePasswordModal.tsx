import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "@emotion/styled";
import { patchUserPassword } from "ApiFarm/user";
import { Button } from "@ComponentFarm/atom/Button/Button";
import ErrorTxt from "@ComponentFarm/atom/ErrorTxt/ErrorTxt";

interface ChangePasswordModalProps {
  show: boolean;
  userId: number;
  onComplete: () => void;
  onClose: () => void;
}

interface IChangePasswordForm {
  password: string;
  passwordConfirm: string;
}

const ChangePasswordModalWrap = styled.div`
  .notice {
    color: #ff672e;
  }
  .inp {
    margin: 20px 0;

    &:last-of-type {
      margin-top: 0;
    }
  }
  button {
    width: 100%;
  }
`;

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  show,
  userId,
  onComplete,
  onClose,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChangePasswordForm>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const user_id = React.useMemo(() => userId, [userId]);

  const updatePasswordMutate = useMutation(patchUserPassword, {
    onSuccess: onComplete,
    onError: onClose,
  });

  const handleUpdatePassword = React.useCallback(
    (formData: { password: string }) =>
      updatePasswordMutate.mutate({ user_id, password: formData.password }),
    [user_id]
  );

  const submit = handleSubmit(handleUpdatePassword);

  const handleInputKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Enter" ||
        e.key === "Space" ||
        e.charCode === 13 ||
        e.charCode === 32
      ) {
        e.preventDefault();
        submit();
      }
    },
    [submit]
  );

  React.useEffect(() => {
    if (!show) reset({ password: "", passwordConfirm: "" });
  }, [show]);

  return (
    <ChangePasswordModalWrap>
      <p className="notice">
        * 비밀번호 작성규칙: 영문과 숫자를 포함한 5~20자리 문자
      </p>
      <input
        className="inp"
        {...register("password", {
          required: "필수 입력값입니다.",
          validate: (value) =>
            /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/.test(value) ||
            "영문과 숫자를 포함한 5~20자리 사이의 값을 입력해 주세요.",
        })}
        placeholder="새 비밀번호"
        type="password"
        autoComplete="new-password"
        onKeyPress={handleInputKeyPress}
      />
      {errors.password && <ErrorTxt>{errors.password.message}</ErrorTxt>}
      <input
        className="inp"
        {...register("passwordConfirm", {
          required: "필수 입력값입니다.",
          validate: (value) =>
            watch("password") === value || "처음 입력한 값과 다릅니다.",
        })}
        type="password"
        placeholder="새 비밀번호 확인"
        autoComplete="new-password"
        onKeyPress={handleInputKeyPress}
      />
      {errors.passwordConfirm && (
        <ErrorTxt>{errors.passwordConfirm.message}</ErrorTxt>
      )}
      <div>
        <Button type="button" onClick={submit}>
          변경하기
        </Button>
      </div>
    </ChangePasswordModalWrap>
  );
};

export default ChangePasswordModal;
