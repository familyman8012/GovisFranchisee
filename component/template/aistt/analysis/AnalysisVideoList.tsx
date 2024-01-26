import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { IFqsInspectionListResponse } from "InterfaceFarm/ai-fqs";
import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { getScoreFormat } from "@UtilFarm/number";
import SkeletonVideoThumb from "./SkeletonVideoThumb";
import { VideoListStyle } from "./style";

type VideoListProps = {
  loading?: boolean;
  list: IFqsInspectionListResponse["list"];
  onItemSelect?: (item: IFqsInspectionListResponse["list"][0]) => void;
};

const AnalysisVideoList: React.FC<VideoListProps> = ({
  loading,
  list,
  onItemSelect,
}) => {
  const router = useRouter();

  if (loading) {
    return <SkeletonVideoThumb count={20} />;
  }

  return (
    <VideoListStyle>
      {list.length === 0 && <Empty>조회된 데이터가 없습니다.</Empty>}
      {list.map((item) => (
        <div className="item" key={item.inspection_info_idx}>
          <button
            type="button"
            onClick={() =>
              onItemSelect
                ? onItemSelect(item)
                : router.push({
                    pathname: `/aistt-analysis/view/${item.inspection_info_idx}`,
                    search: router.asPath.split("?")?.[1] ?? "",
                  })
            }
          >
            <div className="img-wrap">
              <Badge
                color={
                  item.inspection_status === "complete"
                    ? "green"
                    : item.inspection_status === "indeterminate"
                    ? "red"
                    : "yellow"
                }
                dot
                size="sm"
              >
                {item.inspection_status === "complete"
                  ? "검수 완료"
                  : item.inspection_status === "indeterminate"
                  ? "판단 불가"
                  : "영상 불량"}
              </Badge>
              <img
                src={item.inspection_image_url}
                alt={item.product_info_name}
              />
            </div>
            <div className="info-wrap">
              <h3>{item.product_info_name}</h3>
              <ul>
                <li className="score">
                  {getScoreFormat(item.converted_score)}점
                </li>
              </ul>
              <p>{item.store_name}</p>
              <p>
                제조일자{" "}
                {dayjs(item.manufacture_dt).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </div>
          </button>
        </div>
      ))}
    </VideoListStyle>
  );
};

export default AnalysisVideoList;
