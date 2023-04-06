import { ChevronRight, Trash } from "@emotion-icons/bootstrap";
import { Col, Row } from "ComponentsFarm/layouts/styles";
import { iReturnListItem } from "InterfaceFarm/ReturnBoard";

interface ReturnBoardContentInfoProps {
  dataItem: iReturnListItem;
  onClick?: (row: iReturnListItem) => void;
  onDelete?: (row: iReturnListItem) => void;
}

const getRecipeFeedbackContentsInfoStatusValue = (status: number) => {
  let reVal = {
    string: "대기",
    class: "wait",
  };

  switch (status) {
    case 0:
      reVal = {
        string: "구매팀 확인",
        class: "ing",
      };
      break;
    case 1:
      reVal = {
        string: "SV 확인",
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

export const ReturnBoardContentsInfo: React.FC<ReturnBoardContentInfoProps> = ({ dataItem, onClick, onDelete }) => {
  const status = getRecipeFeedbackContentsInfoStatusValue(dataItem.status);
  const rowCursorPointer = onClick ? "cursor-pointer" : "";

  return (
    <Row className={"contents-info cursor-pointer return-style"}>
      {dataItem.sbre_idx > 0 && (
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
            <div className={"subject"}>{dataItem.product_name}</div>
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
