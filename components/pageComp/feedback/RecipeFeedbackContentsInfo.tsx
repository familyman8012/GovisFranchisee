import React from "react";

import { ChevronRight, Trash } from "@emotion-icons/bootstrap";
import { IRecipeFeedbackItem } from "InterfaceFarm/ProductFeedback";
import { Col, Row } from "ComponentsFarm/layouts/styles";

interface RecipeFeedbackContentsInfoProps {
  dataItem: IRecipeFeedbackItem;
  onClick?: (row: IRecipeFeedbackItem) => void;
  onDelete?: (row: IRecipeFeedbackItem) => void;
}

const getRecipeFeedbackContentsInfoStatusValue = (status: number) => {
  let reVal = {
    string: "대기",
    class: "wait",
  };

  switch (status) {
    case 1:
      reVal = {
        string: "처리 중",
        class: "ing",
      };
      break;
    case 2:
      reVal = {
        string: "완료",
        class: "finish",
      };

      break;
    default:
      reVal = {
        string: "대기",
        class: "wait",
      };
      break;
  }
  return reVal;
};

export const getRecipeFeedbackContentsInfoUnReadValue = (unread_content_count: number) => {
  let reVal = "";
  if (unread_content_count > 0) {
    reVal = "unread";
  }

  return reVal;
};

export const RecipeFeedbackContentsInfo: React.FC<RecipeFeedbackContentsInfoProps> = ({
  dataItem,
  onClick,
  onDelete,
}) => {
  const status = getRecipeFeedbackContentsInfoStatusValue(dataItem.status);
  const rowCursorPointer = onClick ? "cursor-pointer" : "";

  return (
    <Row className={"contents-info"}>
      {dataItem.sbf_idx !== 0 && (
        <>
          <div className="col-xl-1 col-sm-2 col-3">
            <div className={`marker-status ${status.class}`}>
              {status.string}
              <span className={getRecipeFeedbackContentsInfoUnReadValue(dataItem.unread_content_count)} />
            </div>
          </div>
          <Col
            className={`contents-summary ${rowCursorPointer}`}
            onClick={() => {
              if (onClick) {
                onClick(dataItem);
              }
            }}
          >
            <div className={"date"}>{dataItem.created_at.substr(0, 10)}</div>
            <div className={"subject"}>{dataItem.title}</div>
          </Col>
          {onClick && (
            <div
              className={`col-2 col-sm-1 ${rowCursorPointer}`}
              onClick={() => {
                onClick(dataItem);
              }}
            >
              <ChevronRight width={15} height={15} />
            </div>
          )}

          {onDelete && dataItem.delete_possible === "Y" && (
            <div
              className={`col-2 col-sm-1 btn-delete-box ${rowCursorPointer}`}
              onClick={() => {
                onDelete(dataItem);
              }}
            >
              <Trash width={25} height={28} />
            </div>
          )}
        </>
      )}
    </Row>
  );
};
