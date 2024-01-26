import dayjs from "dayjs";
import { BoV2Request } from "ApiFarm/index";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { Export } from "@ComponentFarm/atom/icons";
import { downloadAxiosResponse } from "@UtilFarm/download";

const ExportButton = ({
  params,
  endPoint,
  title,
}: {
  params: any;
  endPoint: string;
  title: string;
}) => {
  const downloadRecipeProductList = async () => {
    return BoV2Request.get(endPoint, {
      params: {
        ...params,
        is_export: "1",
      },
      responseType: "blob",
    })
      .then(
        downloadAxiosResponse(
          `${title}_${dayjs().format("YYYY-MM-DD HH:mm:ss")}.xlsx`
        )
      )
      .catch(() => new Error("다운로드에 실패하였습니다."));
  };

  return (
    <Button
      variant="gostSecondary"
      LeadingIcon={<Export />}
      onClick={() => downloadRecipeProductList()}
    >
      내보내기
    </Button>
  );
};

export default ExportButton;
