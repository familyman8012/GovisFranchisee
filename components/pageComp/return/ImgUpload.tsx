import { X } from "@emotion-icons/bootstrap";
import { ReturnApplyImgPost } from "ApiFarm/return";
import { ThumbnailLoading } from "ComponentsFarm/elements/Loading";
import { ISendImg } from "PagesFarm/board/return/post";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UploadWrapper } from "./style";

interface ObjType {
  [index: string]: string | number | null | undefined;
}

const ImgUpload = ({
  item,
  mode,
  sendImg,
  setSendImg,
}: {
  item: ObjType;
  mode?: string;
  sendImg?: ISendImg[];
  setSendImg?: Dispatch<SetStateAction<undefined | ISendImg[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });

  const [changImg, setChangImg] = useState("");

  const [State, setState] = useState("");

  // 이미지 초기 셋팅
  useEffect(() => {
    if (mode === "modify" && State !== "change") {
      if (item?.attached_imgurl !== null && item?.attached_imgurl !== undefined) {
        setImage({
          image_file: String(item?.attached_imgurl),
          preview_URL: String(item?.attached_imgurl),
        });
      } else {
        setImage({
          image_file: "",
          preview_URL: "",
        });
      }
    }
  }, [item]);

  // 수정모드에서는 이미지 개별 수정가능
  useEffect(() => {
    if (changImg === "change") {
      sendImageToServer();
      setChangImg("");
      setState("change");
    }
  }, [changImg]);

  const [loaded, setLoaded] = useState(false);

  const saveImage = async (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target && e.target.files[0]) {
      setLoaded(true);
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: String(fileReader.result),
      });
      setLoaded(false);
      // 수정모드에서는 이미지 개별 수정가능
      if (mode === "modify") {
        setChangImg("change");
      }
      if (mode !== "modify") {
        setSendImg !== undefined &&
          setSendImg(
            typeof sendImg !== "undefined"
              ? [
                  ...sendImg,
                  {
                    id: String(item.attached_number),
                    img: e.target.files[0],
                  },
                ]
              : undefined
          );
      }
    };
  };

  const deleteImage = async () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImage({
      image_file: "",
      preview_URL: "",
    });
    setLoaded(false);
    // 수정모드에서는 이미지 개별 삭제가능
    if (mode === "modify") {
      const formData = new FormData();
      Object.keys(item).forEach((key) => formData.append(key, String(item[key])));
      formData.append("process_type", "D");
      const result = await ReturnApplyImgPost(formData);
      setState("change");
    }
    if (mode !== "modify") {
      setSendImg !== undefined &&
        sendImg !== undefined &&
        setSendImg(sendImg.filter((el: ISendImg) => el.id !== item.attached_number));
    }
  };

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();

      Object.keys(item).forEach((key) => formData.append(key, String(item[key])));

      formData.append("process_type", "C");

      formData.append("attached_file", image.image_file);

      const result = await ReturnApplyImgPost(formData);
      setLoaded(false);
    } else {
      alert("사진을 등록하세요!");
    }
  };

  return (
    <UploadWrapper>
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={inputRef}
        className="inputfile"
        style={{ display: "none" }}
      />
      <div className="img-wrapper" onClick={(e) => e.stopPropagation()}>
        {loaded === false ? (
          <div className="inner">
            <>
              {image.preview_URL !== "" ? (
                <img src={String(image.preview_URL)} width="200" />
              ) : // <PlusLg width={16} height={16} />
              item.attached_number === 1 ? (
                <div>거래명세서</div>
              ) : item.attached_number === 2 ? (
                <div>한글표시사항</div>
              ) : item.attached_number === 3 ? (
                <div>
                  크기 특정
                  <br />
                  가능한 이물질
                </div>
              ) : (
                <div>
                  이상 제품
                  <br /> 자체의 사진
                </div>
              )}
            </>
          </div>
        ) : (
          <ThumbnailLoading />
        )}
      </div>

      <div className="upload-button">
        <span className="btn btn_add_file" onClick={() => inputRef?.current?.click()}>
          {image.image_file === "" ? "Add" : "Change"}
        </span>
        {image.image_file !== "" && (
          <span className="btn btn_del_file" onClick={deleteImage}>
            <X />
          </span>
        )}
      </div>
    </UploadWrapper>
  );
};

export default ImgUpload;
