import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Edit, Pic } from "@ComponentFarm/atom/icons";
import Plus from "@ComponentFarm/atom/icons/Plus";
import useSyncedRef from "HookFarm/useSyncedRef";

const FileInputStyle = styled.div`
  min-width: 24rem;
  max-width: 40rem;
  width: 100%;

  .thumb {
    position: relative;
    margin-bottom: 1.6rem;
    margin-right: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    overflow: hidden;

    &::before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: var(--color-neutral90);
      border-radius: 0.8rem;
    }
  }

  input {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .no-image {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.8rem;
    background: var(--color-neutral90);
    font-size: 1.2rem;
    line-height: 1.5;
    font-weight: normal;

    svg {
      width: 4rem;
      height: 4rem;
      margin-bottom: 3%;
    }
  }

  button {
    border-color: transparent !important;
  }
`;

const toBase64 = (file: File) =>
  new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result ?? "");
    reader.onerror = (error) => reject(error);
  });

interface SelectFileProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "type" | "onChange" | "multiple"
  > {
  src?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectFile = React.forwardRef<HTMLInputElement, SelectFileProps>(
  ({ onChange, accept = "image/*", src, ...otherProps }, ref) => {
    const refs = useSyncedRef<HTMLInputElement>(ref);
    const [source, setSource] = React.useState("");

    const handleFileChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files || e.target?.files.length === 0) {
          setSource("");
          onChange?.(e);
          return;
        }

        const base64Str = await toBase64(e.target.files[0]!);
        setSource(
          typeof base64Str === "string" ? base64Str : base64Str.toString()
        );
        onChange?.(e);
      },
      [onChange]
    );

    useEffect(() => setSource(src ?? ""), [src]);

    return (
      <FileInputStyle>
        <label className="thumb">
          {source ? (
            <img src={source} alt="이미지" />
          ) : (
            <p className="no-image">
              <Pic />
              <span>권장 용량 최대 2MB</span>
            </p>
          )}
          <input
            type="file"
            {...otherProps}
            ref={refs}
            accept={accept}
            onChange={handleFileChange}
          />
        </label>

        <Button
          variant="gostPrimary"
          LeadingIcon={source ? <Edit /> : <Plus />}
          onClick={() => refs.current?.click()}
        >
          {source ? "이미지 수정" : "이미지 추가"}
        </Button>
      </FileInputStyle>
    );
  }
);

SelectFile.displayName = "SelectFile";

export default SelectFile;
