import { Trash } from "@emotion-icons/bootstrap/Trash";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { Row } from "ComponentsFarm/layouts/styles";
import { iSuggestionListContent, iSuggestionViewContent } from "InterfaceFarm/SuggestionBoard";
import { SyntheticEvent } from "react";

interface SuggestionContentsListProps {
  dataList: iSuggestionListContent[];
  onClickDelete?: (sbqc_idx: number) => void;
}

const getProcData = (dataList: iSuggestionViewContent[]) => {
  let reVal = [];
  let lastCreateDate = "";
  for (let key in dataList) {
    let row = dataList[key];

    if (row.created_at.substr(0, 10) !== lastCreateDate) {
      reVal.push({
        sbqc_idx: Math.random(),
        created_at: "",
        user_type: -1,
        content_type: -1,
        user_name: "",
        content_value: row.created_at.substr(0, 10),
        is_read: 0,
      });
      lastCreateDate = row.created_at.substr(0, 10);
    }
    reVal.push(row);
  }
  return reVal;
};

const getImageErrorNoImage = (e: SyntheticEvent<HTMLImageElement>) => {
  (e.currentTarget.src as any) = <img src="/images/no-image.png" alt="no-img" />;
};

export const SuggestionBoardContentsList: React.FC<SuggestionContentsListProps> = ({ dataList, onClickDelete }) => {
  let viewData = getProcData(dataList);
  return (
    <ul className={"contents-list"}>
      {viewData.length === 0 && (
        <li>
          <EmptyView>데이터 조회결과가 존재하지 않습니다.</EmptyView>
        </li>
      )}

      {viewData.map((row) => {
        if (row.content_type === -1) {
          return (
            <li className="date no-background" key={row.sbqc_idx}>
              <h5>{row.content_value}</h5>
            </li>
          );
        } else if (row.content_type === 0 && row.user_type === 1) {
          return (
            <li key={row.sbqc_idx}>
              <p>{row.content_value}</p>
              {row.is_read === 0 && (
                <>
                  <hr />
                  <button
                    onClick={() => {
                      if (onClickDelete) {
                        onClickDelete(row.sbqc_idx);
                      }
                    }}
                  >
                    <Trash width={18} height={18} />
                    <br />
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        } else if (row.content_type === 1 && row.user_type === 1) {
          return (
            <li key={row.sbqc_idx} className="no-background">
              <Row>
                <div className="col-sm-1 col-3 offset-sm-1">
                  {row.is_read === 0 && (
                    <button
                      onClick={() => {
                        if (onClickDelete) {
                          onClickDelete(row.sbqc_idx);
                        }
                      }}
                    >
                      <Trash width={18} height={18} />
                      <br />
                      삭제
                    </button>
                  )}
                </div>
                <div className="col-sm-10 col-9">
                  <img src={row.content_value} width={"100%"} onError={getImageErrorNoImage} />
                </div>
              </Row>
            </li>
          );
        } else if (row.content_type === 2 && row.user_type === 1) {
          return (
            <li key={row.sbqc_idx} className={"no-background"}>
              <Row>
                <div className="col-sm-1 col-3 offset-sm-1">
                  {row.is_read === 0 && (
                    <button
                      onClick={() => {
                        if (onClickDelete) {
                          onClickDelete(row.sbqc_idx);
                        }
                      }}
                    >
                      <Trash width={18} height={18} />
                      <br />
                      삭제
                    </button>
                  )}
                </div>
                <div className="col-sm-10 col-9">
                  <video controls width="100%">
                    <source src={row.content_value + "#t = 0.001"} />
                  </video>
                </div>
              </Row>
            </li>
          );
        } else if (row.content_type === 0 && row.user_type === 0) {
          return (
            <li className="answer" key={row.sbqc_idx}>
              <h6>담당자</h6>
              <p>{row.content_value}</p>
            </li>
          );
        } else if (row.content_type === 1 && row.user_type === 0) {
          return (
            <li className="no-background answer" key={row.sbqc_idx}>
              <Row>
                <div className="col-sm-10 col-9">
                  <img src={row.content_value} width="100%" onError={getImageErrorNoImage} />
                </div>
              </Row>
            </li>
          );
        } else if (row.content_type === 2 && row.user_type === 0) {
          return (
            <li className="no-background answer" key={row.sbqc_idx}>
              <Row>
                <div className="col-sm-10 col-9">
                  <video controls width={"100%"}>
                    <source src={row.content_value + "#t=0.001"} />
                  </video>
                </div>
              </Row>
            </li>
          );
        }
      })}
    </ul>
  );
};
