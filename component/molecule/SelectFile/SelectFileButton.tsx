import React, { ChangeEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Cross } from "@ComponentFarm/atom/icons";
import LinkIcon from "@ComponentFarm/atom/icons/Link";
import useSyncedRef from "HookFarm/useSyncedRef";

const SelectFileButtonStyle = styled.div`
  display: inline-flex;
  flex-direction: column;

  .thumb {
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
    gap: 0 0.4rem;
    max-width: 100%;
    overflow: hidden;
    a {
      color: var(--color-neutral10);
      text-decoration: underline;
      line-height: 1;
      font-weight: 400;
      max-width: 100%;
      overflow: hidden;
      max-width: 22rem;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    svg:nth-of-type(2) {
      border-radius: 50%;
      background-color: var(--color-neutral80);
      cursor: pointer;
      path {
        fill: var(--color-gray1);
      }
    }
  }

  .insert {
    display: flex;
    align-items: center;
    p {
      margin-left: 1.6rem;
      color: var(--color-neutral50);
      font-weight: 500;
    }
  }
  input {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

interface SelectFileProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "type" | "onChange" | "multiple" | "src"
  > {
  src?: string | File | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

const SelectFileButton = React.forwardRef<HTMLInputElement, SelectFileProps>(
  ({ onChange, accept = "image/*", src, onRemove, ...otherProps }, ref) => {
    const refs = useSyncedRef<HTMLInputElement>(ref);
    const [file, setFile] = React.useState<File | string | null>(null);

    const handleFileChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files || e.target?.files.length === 0) {
          onChange?.(e);
          return;
        }

        setFile(e.target.files[0]);
        onChange?.(e);
      },
      [onChange]
    );

    useEffect(() => setFile(src ?? ""), [src]);

    const handleRemoveFile = React.useCallback(
      (e: React.MouseEvent<HTMLOrSVGElement>) => {
        if (!refs.current) return;

        if (refs.current?.files) {
          refs.current.value = "";
        }

        const changeEvent = new Event("change", {
          bubbles: true,
        }) as any;

        refs.current.dispatchEvent(changeEvent);

        setFile(null);
        onRemove?.();
      },
      [onChange]
    );

    return (
      <SelectFileButtonStyle>
        <div className="insert">
          <input
            type="file"
            {...otherProps}
            ref={refs}
            accept={accept}
            onChange={handleFileChange}
          />
          <Button variant="gostPrimary" onClick={() => refs.current?.click()}>
            이미지 첨부
          </Button>
          <p>이미지 파일을 첨부해주세요. (최대 1장, 2mb 이하)</p>
        </div>
        {file &&
          (typeof file === "string" ? (
            <div className="thumb">
              <LinkIcon />
              <a href={file} target="_blank">
                {file}
              </a>
              <Cross className="close" onClick={handleRemoveFile} />
            </div>
          ) : (
            <div className="thumb">
              <LinkIcon />
              <a href={URL.createObjectURL(file)} target="_blank">
                {file.name}
              </a>
              <Cross className="close" onClick={handleRemoveFile} />
            </div>
          ))}
      </SelectFileButtonStyle>
    );
  }
);

SelectFileButton.displayName = "SelectFileButton";

export default SelectFileButton;
