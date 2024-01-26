import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { fetchAnalysisResult } from "ApiFarm/aistt";
import Editor from "@ComponentFarm/modules/Editor/Editor";
import { Button } from "@ComponentFarm/atom/Button/Button";
import HtmlViewer from "@ComponentFarm/atom/HtmlViewer/HtmlViewer";
import { AreaBox } from "@ComponentFarm/template/common/AreaBox";

const pageSty = css`
  .box_head {
    margin-bottom: 2.4rem;
  }
  .ql-formats:nth-of-type(7) {
    display: none;
  }

  .no_content {
    text-align: center;
    padding-bottom: 3.2rem;
    .txt1 {
      margin-bottom: 2.4rem;
      color: var(--color-blue_gray50);
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 110%;
    }

    .txt2 {
      color: var(--color-blue_gray50);
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 120%;
    }
  }
`;

interface AnalysisResultProps {
  isLoading?: boolean;
  view: { fqs_reports_idx: string; number: number };
  data?: string;
}

const AnalysisResult = ({ isLoading, view, data }: AnalysisResultProps) => {
  const [editMode, setEditMode] = useState(false);
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  const { fqs_reports_idx, number } = view;
  const handleTextChange = (value: string) => {
    setContents(value);
  };

  useEffect(() => {
    setContents(data || "");
  }, [data]);

  const saveSubmit = useMutation(fetchAnalysisResult, {
    onSuccess: () => {
      toast.info("분석 결과가 수정되었습니다.");
      queryClient.invalidateQueries(["report-info"]);
    },
  });

  const handlerSaveSubmit = () => {
    setEditMode((prev) => !prev);

    if (editMode && contents !== data) {
      saveSubmit.mutate({ fqs_reports_idx, number, contents });
    }
  };

  return (
    <AreaBox
      title="분석 결과"
      css={pageSty}
      addFunc={
        <>
          {!isLoading && (
            <Button onClick={handlerSaveSubmit}>
              {editMode
                ? !data
                  ? "입력 완료"
                  : "수정 완료"
                : !data
                ? "입력"
                : "수정"}
            </Button>
          )}
        </>
      }
    >
      {editMode ? (
        <Editor value={String(contents)} onChange={handleTextChange} />
      ) : !data ? (
        <div className="no_content">
          <p className="txt1">
            {isLoading ? (
              <Skeleton width="30%" height="100%" baseColor="#fcfcfc" />
            ) : (
              "등록된 정보가 없습니다."
            )}
          </p>
          <p className="txt2">
            {isLoading ? (
              <Skeleton width="30%" height="100%" baseColor="#fcfcfc" />
            ) : (
              "우측 버튼을 클릭 후 내용을 입력해주세요"
            )}
          </p>
        </div>
      ) : (
        <HtmlViewer html={data} />
      )}
    </AreaBox>
  );
};

export default AnalysisResult;
