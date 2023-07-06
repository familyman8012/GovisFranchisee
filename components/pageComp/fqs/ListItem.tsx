import React from "react";
import { iFQSListItem } from "InterfaceFarm/Fqs";

import { Image } from "@emotion-icons/bootstrap/Image";
import { FqsListItemStyle, NoImage } from "./styles";
import dayjs from "dayjs";

interface Props {
  item: iFQSListItem;
  onClick: (item: iFQSListItem) => void;
}
const FqsListItem = ({ item, onClick }: Props) => {
  return (
    <FqsListItemStyle onClick={() => onClick(item)}>
      {item.official_image ? (
        <img
          src={item.official_image}
          className={"image"}
          alt={item.category_name}
        />
      ) : (
        <NoImage>
          <Image width={40} height={40} />
        </NoImage>
      )}
      <div className="item-content">
        <div>
          <div className="item-date">
            {dayjs(item.created_at).format("YYYY-MM-DD")}
          </div>
          <div className="item-name">{item.category_name}</div>
        </div>
        <div className="item-score">{item.overall_score_100}</div>
      </div>
    </FqsListItemStyle>
  );
};

export default FqsListItem;
