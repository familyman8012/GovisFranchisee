import { iInteriorReview } from "InterfaceFarm/InteriorBoard";
import React from "react";
import { BoxReview, NoticeComplete, SelectRadioItem } from "./style";

interface iInteriorComplete {
  review: iInteriorReview;
}

export default function InteriorComplete({ review }: iInteriorComplete) {
  return (
    <>
      {review && (
        <>
          <BoxReview>
            <h6>인테리어 AS</h6>
            <p>A.S 처리는 만족스러우셨습니까?</p>
            <ul>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <SelectRadioItem
                    key={`workspace${i}`}
                    i={i}
                    sel={review.work_score}
                  />
                ))}
            </ul>
            <p>담당자의 응대는 어떠하였습니까?</p>
            <ul>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <SelectRadioItem
                    key={`service_score${i}`}
                    i={i}
                    sel={review.service_score}
                  />
                ))}
            </ul>
            <p>
              {review.review_text?.split("\n").map((txt: string, i: number) => {
                return (
                  <React.Fragment key={`line${i}`}>
                    {txt}
                    <br />
                  </React.Fragment>
                );
              })}
            </p>
          </BoxReview>
          <NoticeComplete>점주님께서 완료처리 하였습니다.</NoticeComplete>
        </>
      )}
    </>
  );
}
