import React, { useEffect, useState } from "react";
import { Image } from "@emotion-icons/bootstrap";

export interface iFileUploadInput {
  callbackUploadFiles: Function;
}

export default function FileUploadInput(props: iFileUploadInput) {
  const { callbackUploadFiles } = props;
  const [uploadFileList, setUploadFileList] = useState<File[]>([]);

  useEffect(() => {
    procFileUpload();
  }, [uploadFileList]);

  const handlerFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFileList(Array.from(event.target.files || []));
  };

  const procFileUpload = () => {
    callbackUploadFiles(uploadFileList);
  };

  return (
    <>
      <label className={"image-box-label"} htmlFor={"formFileMultiple"}>
        <Image width={20} height={20} />
        <span>이미지 첨부</span>
        <input className="form-control" type="file" id="formFileMultiple" multiple onChange={handlerFileChange} />
      </label>
    </>
  );
}
